using C2S.Brazil2014.Fetcher.Jobs;
using Quartz;
using Quartz.Impl;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace C2S.Brazil2014.Fetcher
{
    class Program
    {
        static void Main(string[] args)
        {   // Get an instance of the Quartz.Net scheduler
            var schd = StdSchedulerFactory.GetDefaultScheduler();

            // Start the scheduler if its in standby
            if (!schd.IsStarted)
                schd.Start();

            // Define the Job to be scheduled
            var job = JobBuilder.Create<FetchMatch>()
                .WithIdentity("WriteHelloToLog", "IT")
                .RequestRecovery()
                .Build();

            // Associate a trigger with the Job
            var trigger = (ICronTrigger)TriggerBuilder.Create()
                .WithIdentity("WriteHelloToLog", "IT")
                .WithCronSchedule("0/10 * * 1/1 * ? *") // visit http://www.cronmaker.com/ Queues the job every minute
                .StartAt(DateTime.UtcNow)
                .WithPriority(1)
                .Build();

            // Validate that the job doesn't already exists
            if (schd.CheckExists(new JobKey("WriteHelloToLog", "IT")))
            {
                schd.DeleteJob(new JobKey("WriteHelloToLog", "IT"));
            }

            var schedule = schd.ScheduleJob(job, trigger);
            Console.WriteLine("Job '{0}' scheduled for '{1}'", "WriteHelloToLog", schedule.ToString("r"));

            Console.ReadLine();
        } // Get an instance of the Quartz.Net scheduler

    }
}
