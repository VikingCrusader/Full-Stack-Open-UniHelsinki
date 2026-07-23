2025/11/23 DAY 1 STREAK

1.website rendering load logic
OPEN BROWSER then send HTTP GET request to get HTML document
then the resources (CSS JS IMG FONT...) will send GET request
After the execution of JS, send JSON request for data
The browser analyse HTML CSS JS to render page

2.submit form and redirect (Post-Redirect-Get)
user fill the form -> click submit -> browser send POST request to server
After server save data, return 302 Redirect -> reload page again (HTML, CSS, JS, JSON...)

3.SPA
SPA only load HTML CSS JS once
The afterwards change made by JS dynamicly, it will not redirect and reload page again.
Using AJAX technology.
