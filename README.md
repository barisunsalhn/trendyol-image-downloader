# trendyol image downloader

Trendyol (Turkey's Amazon) is so slow (actually dead slow, sometimes I wonder what are those devs doing over there??). So I developed a plugin to download images (named with the url pointed to trendyol and comment count.)


# Instructions 
Go to your shortcut of favorite chromium based browser and add 2 flags(disable-web-security and user-data-dir flags).

Search sth on trendyol and replace the url & urlRest (&pi= path variable instructs page id I guess?) in background.js file with the url you fetched from network tab of developer tools. Also add your bearer token.

You can change downloaded filenames by debugging with background page (open developer mode on extensions page). 

# :(
Sorry for indentation and poor documentation, I just wrote this in 2 hours.
