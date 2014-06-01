$target = "\\magenta\wwwroot\brazil2014.krux.fr"

$current = (get-location).path 

$source = "$current\Brazil2014"


xcopy $source $target /y /s /exclude:DeployExcludes.txt
