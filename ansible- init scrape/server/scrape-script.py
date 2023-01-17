from bs4 import BeautifulSoup
import pandas as pd
import requests
from time import sleep
from datetime import date, timedelta

#create empty arrays for data we're collecting
dates=[]
url_list=[]
final = []

#map site

url = "https://spotifycharts.com/regional/us/daily/"
start_date= date(2022, 1, 1)
end_date= date(2022, 11, 1)

delta= end_date-start_date

for i in range(delta.days+1):
	day = start_date+timedelta(days=i)
	day_string= day.strftime("%Y-%m-%d")
	dates.append(day_string)

def add_url():
	for date in dates:
		c_string = url+date
		url_list.append(c_string)

add_url()

#function for going through each row in each url and finding relevant song info

def song_scrape(x):
    pg = x
    for tr in songs.find("tbody").findAll("tr"):
        artist= tr.find("td", {"class": "chart-table-track"}).find("span").text
        artist= artist.replace("by ","").strip()
  
        title= tr.find("td", {"class": "chart-table-track"}).find("strong").text
 
        songid= tr.find("td", {"class": "chart-table-image"}).find("a").get("href")
        songid= songid.split("track/")[1]
    
        url_date= x.split("daily/")[1]
        
        final.append([title, artist, songid, url_date])
	
#loop through urls to create array of all of our song info

for u in url_list:
    read_pg= requests.get(u)
    sleep(2)
    soup= BeautifulSoup(read_pg.text, "html.parser")
    songs= soup.find("table", {"class":"chart-table"})
    song_scrape(u)
 
#convert to data frame with pandas for easier data manipulation

final_df = pd.DataFrame(final, columns= ["Title", "Artist", "Song ID", "Chart Date"])

#write to csv

with open('spmooddata.csv', 'w') as f:
        final_df.to_csv(f, header= True, index=False)