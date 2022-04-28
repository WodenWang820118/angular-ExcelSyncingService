# Excel UI rendering and cell binding
2022-04-28
What I've done:
1. I've checked several libraries but can only show the spreadsheet.
2. However, the UI rendering on the frontend doesn't provide cell value binding.

What I am going to do:
1. Use the keyword "spreadsheet" to get data rendered on the frontend.
2. Use Python to connect the Javascript and the web, since Python has a comfortable language style. (X)
3. Use Javascript to render UI and let user edit and specify the cell to bind the value. At the same time, send the xlsx file back for Python to handle the data processing. Because Python needs to be active for processing data, it's better to Steamlit (or just Python) to cache the data as a backend. Further, use openpyxl to update the data whenever the user save the data from the frontend. (X) -> there's a library called luckySheet can handle all the use cases.