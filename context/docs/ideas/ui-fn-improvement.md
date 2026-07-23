# UI & Functionality Improvements

- In the Tenant form, for Add Tenant operation include the input fields of an user. Because tenant has a User connected to it. So the submittion should create a User along with a Tenant. And for the update operation form add only those User fields that are updateable(nid, image, name). As we haven't implemented saving media funtionality we'll keep the image file input in the frontend but it will be unused. User select dropdown from both the form should be removed.
- We need to create some computed fields which will not actually be saved in database but will be computed on data delivery time for display. Implement this in the Prisma way while dealing with Neon db(Postgres).
  - For flats the display value will be the flat code only. This should be displayed in the select dropdown as well instead of the uuid.
  - For Gas & Eletric meter the display field will show the meter number and flat code
- We have to handle the datetimes in a consistent manner
  1. For datetime's display value in the tables use readable date and time string. This should be a computed field for any datetime model field. It will convert utc datetime to the bangladeshi standard date time for display.
  2. For table's daterange filter - Pick the bd standard datetime, convert to utc datetime, then use the utc datetime to filter from db and return the response with the display computed field.
  3. As day.js is default with ant vue try to use that if it meats our requirement. Or else use luxon, install if needed.
- For the description components can we have a more differentiator background color
- In the buttons with an icon and text they are not center aligned in the y axis. Fix it in all instances.
- None of the page back buttons are funtional. Fix it.
- The table action buttons should have more as padding. It will improve it's looks. We can add some colors to the action buttons.
- For the Rent Management sidebar link, if any of it's sublink pages are selected/hovered at that time the background of Rent Management link is changed but the text color doesn't change. So the text gets invisible at that time.
- I like the login/signup button size. We can increase the button size in the admin pages and maintain the same size for call to action buttons. If any of the ant vue button size matches we can use that otherwise new class would do the trick.
- For all the forms change the Button text from Create to Save for the form submit button.
- For all form's cancel button use the danger color. It should be consitent.
- For the card style we can increase a little bit more shadow to create a modern and glowing vibe.
- Overall try to bring few colors to the admin pages to make it more appealing. Not much. We can take some color variables used in our Dashboard. If necessary create new variable. Using some text colors for special texts and icons.
- But I like the overal plain and visibility of the pages currently. So keeping the current clean approach is a must.
- Please select a suitable font for this project. Use that from google fonts for now. Later we can have a local copy of that.
