using C2S.Brazil2014.Fetcher.Jobs;
using Common.Logging;
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
        private static ILog log = LogManager.GetLogger<Program>();

        static void Main(string[] args)
        {   // Get an instance of the Quartz.Net scheduler
            var schd = StdSchedulerFactory.GetDefaultScheduler();

            // Start the scheduler if its in standby
            if (!schd.IsStarted)
                schd.Start();


            RegisterJob<FetchMatch>(schd, "0 0/1 * 1/1 * ? *");
            RegisterJob<FetchNews>(schd, "0 0/15 * 1/1 * ? *");
            RegisterJob<FetchVideos>(schd, "0 0/15 * 1/1 * ? *");

            Console.ReadLine();
        }
        private static void RegisterJob<T>(IScheduler schd, string cron )
            where T:IJob
        {
            var name = typeof(T).Name;

            // Define the Job to be scheduled
            var job = JobBuilder.Create<T>()
                .WithIdentity(name, "Brazil2014")
                .RequestRecovery()
                .Build();

            // Associate a trigger with the Job
            var trigger = (ICronTrigger)TriggerBuilder.Create()
                .WithIdentity(name, "Brazil2014")
                .WithCronSchedule(cron) // visit http://www.cronmaker.com/ Queues the job every minute
                .StartAt(DateTime.UtcNow)
                .WithPriority(1)
                .Build();

            // Validate that the job doesn't already exists
            if (schd.CheckExists(new JobKey("FetchMatchs", "Brazil2014")))
            {
                schd.DeleteJob(new JobKey("FetchMatchs", "Brazil2014"));
            }

            
            var schedule = schd.ScheduleJob(job, trigger);
            log.InfoFormat("Job '{0}' scheduled for '{1}'", "Brazil2014", schedule.ToString("r"));

        
        }

    }
}
