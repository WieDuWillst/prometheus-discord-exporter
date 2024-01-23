#  prometheus-discord-exporter

##  Metrics

* Member Count

* Channel Count

* Role Count

  

##  Setup

* copy the github repo onto your device

* create a discord bot and invite it to your server

* fill out the .env with the needed information

* run 'npm i' in the directory

* (add it to autostart)

* start the exporter

* the exporter is now available under the port 9191

  

##  Prometheus.yml

###  example

    -  job_name:  'discord_exporter'
	    scrape_interval:  5m
	    static_configs:
		    -  targets:  ['localhost:9191']

## Grafana
### [dashbord.json](https://pastebin.com/BgA9Ux2A)

## Notice
### You can use and edit this as you wish. It's just a project i did in about an hour because i was bored.
* maybe i also add something like a total message count and more
