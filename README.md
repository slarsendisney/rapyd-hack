# Making a unique store for your high-value products shouldn't be difficult.
Whether you're offering a service, selling a sports car or sending people to space, creating a store that is unique takes time. Especially if you want that store to have a great checkout experience. Powered by Rapyd, PlutusPay.app solves this problem. A batteries included no-code, store generator with intelligent checkouts.

##⚡️ Quick Links:
- [Try the site](https://www.plutuspay.app/)
- [DevPost](https://devpost.com/software/plutus-pay)

## 🔨 Made By:
- [Carlota Veal-Baschwitz](https://www.linkedin.com/in/carlota-v-201176156/)
- [Sam Larsen-Disney](https://sld.codes)

In this hackathon, we wrote exactly 4324 lines of code. We're hoping 4324 is our new lucky number!

## 💡 Inspiration
When we read the brief, there was one line that stood out to us... *“You do not have to build for the space tourism use-case.”* We realised that **there are plenty of high-value use cases that could benefit from the virtual account payment system**. We also quickly realised that any product this valuable deserves a unique store for taking payment.

But creating a unique store for every product is a time consuming process. Especially one with a great checkout experience.  So we asked ourselves the question - What if we built a tool that solves this problem? We used this hackathon to make a customisable, no-code, store generator with intelligent checkouts and of course we wanted to build in Rapyd integration for accepting payments for high-value transactions. 

## 🤩 What it does
The Application first acts as a no-code store creator for store owners.
- **No-code store creation**: This includes customising images, theme and text across the site.
- **Funds all Separate**: Each store has its own wallet so funds never get confused. 
- **Unique website addresses for every created store**: That you can share with customers to start accepting payments.
- **Deposit, instalments and one-time payments included**: Each customer gets their own virtual account when they start checkout which is configured to handle any required payment strategy.
- **Streamlined refund issuing**: Customers can cancel their purchase and input their bank details, once the store owner has accepted. The refund is issued.
- **Stats**: View your stores, their funds and performance all in one place.

Secondly as a customer visiting a store the application facilitates purchases:
- **Intelligent Checkout**: The checkout uses information supplied by default in requests to save you the hassle of typing in your country and currency. Less forms for customers === win! You can also override this in the rare case we get it wrong!
- **Third-party login**: Creating new accounts is a pain, so just sign in with google, twitter or github if you like.
- **Easy to understand flow**: As soon as you initiate the checkout flow you know exactly how many steps there are. We break down every step to make it clear what we need from you.  
- **Mobile Responsive**: On the go? No problem! Purchase right from your phone.

## 🚀 How we built it
The application was built with:
- **Rapyd APIs for all things payments**. Programmatic wallet creation and virtual accounts.
- **ReactJS** as the de-facto JavaScript library for building user interfaces
- **NextJS** as our blazing fast React framework for performance, scalability, security and accessibility
- **Vercel Serverless Functions** to bring an entire backend to PlutusPay - without managing a backend
- **Firebase** to enable user accounts, SSO, and database.
- **TailwindCSS** to leverage the benefits and speed of the utility first CSS framework .

## 💰 Monetisation Potential & Business Strategy
Our monetisation strategy would be a tier-based subscription model. A free tier might allow you to create 3 stores and then we would offer a membership for unlimited stores.

## 💪 Accomplishments that we're proud of

Over the past few weeks we've turned an idea we thought to be impossible in the time frame into a product we could actually use and potentially even monetise, while also using technology to work towards a better and more unique store experience.

## 🧐 Challenges we ran into

- **Working with brand new APIs from Rapyd**. Rapyd's eco-system was totally new to us. Learning it at pace while trying to use it was challenging but fun!
- **Integrating autosave on our checkout**. We wanted to ensure that users would never experience going half-way through the checkout and accidentally losing their progress. Our autosave function merges local form data with the database after every click.
- **Aggregating stats via complex queries**. Aggregating stats across multiple tables led to some of the most complex queries we have had to write so far.
- **Making the store customisable via themes**. We had to create a custom built a context provider that grabs the store configuration, finds the theme and then appends the correct classname to the body element. 
- **Wildcard subdomains**. Not knowing what the domains that users would set up was not something we had encountered before. The most challenging thing in this was finding the right thing to google. It turns out the correct term for this is "wildcard subdomains". Vercel made setting these up easy.

## 🤯 What we learned

Carlota- "Designing checkouts that would feel great even when themed differently was an interesting challenge which really made me focus on perfecting my wireframes. Also loved finding creative ways to reduce the number of form inputs a user needed to complete."

Sam - "Rapyd's API was totally new to me, sandbox mode really helped! Trying to tie in store creating with wallet creation was interesting and ensuring that actions taken in Rapyd always matched what we had in our database."

## What's next for PlutusPay.app
We've enjoyed working on this project but it is still a long way from perfect. We would love to add:
- More themes and introduce font customisations
- More Rapyd webhook use - The webhook offering is super interesting but we didnt have enough time to utilise all the events we would have liked to. By using more webhook functionality we could make our checkouts even more intelligent! 

Thanks Rapyd for making this awesome event!
