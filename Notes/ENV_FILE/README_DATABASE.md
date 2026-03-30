# README — Database Configuration
### Variable: `MONGO_URI`

---

## What Is This Section?

`MONGO_URI` is the connection string your application uses to talk to a MongoDB database. It contains the address of the database, your username, your password, and the name of the specific database — all bundled into one URL-like string.

You will get this from MongoDB Atlas, which is MongoDB's official free cloud hosting service.

---

## What You Will Get

By the end of this guide, you will have a string that looks like this:

```
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.abcde.mongodb.net/yourDatabaseName?retryWrites=true&w=majority
```

---

## Step-by-Step Guide

**Step 1 — Create a free MongoDB Atlas account**

Go to: https://www.mongodb.com/cloud/atlas/register

Fill in your name, email address, and a password. Click "Create your Atlas account". Verify your email if prompted.

---

**Step 2 — Choose a plan**

After signing in, Atlas will ask you to pick a plan. Select the "Free" tier, which is labelled "M0". Click "Create".

---

**Step 3 — Name your cluster**

You will be asked to name your cluster. A cluster is just a server that holds your databases. You can name it anything — for example `Cluster0`. The name does not appear in your application code.

---

**Step 4 — Choose a cloud provider and region**

Select any cloud provider (AWS, Google Cloud, or Azure — it does not matter for free tier). Then pick the region closest to where your users will be. Click "Create Cluster". Wait about 1–3 minutes for Atlas to provision it.

---

**Step 5 — Create a database user**

Step 5a — In the left sidebar, click "Database Access".

Step 5b — Click the green button "Add New Database User".

Step 5c — Choose "Password" as the authentication method.

Step 5d — Enter a username (for example: `appUser`) and a strong password. Save both of these somewhere safe — you will need them in your URI.

Step 5e — Under "Built-in Role", select "Read and write to any database".

Step 5f — Click "Add User".

---

**Step 6 — Whitelist your IP address**

Step 6a — In the left sidebar, click "Network Access".

Step 6b — Click "Add IP Address".

Step 6c — For development, click "Allow Access from Anywhere" which fills in `0.0.0.0/0`. This lets any machine connect. For production, you should restrict this to your server's IP address.

Step 6d — Click "Confirm".

---

**Step 7 — Get your connection string**

Step 7a — In the left sidebar, click "Database" under the Deployment section.

Step 7b — Next to your cluster name, click the "Connect" button.

Step 7c — A popup appears. Click "Drivers".

Step 7d — Select "Node.js" as the driver. The version does not matter much; choose the latest.

Step 7e — You will see a connection string appear. It will look like this:

```
mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority
```

Step 7f — Copy that entire string.

---

**Step 8 — Customise the string**

Step 8a — Replace `<username>` with the database username you created in Step 5.

Step 8b — Replace `<password>` with the password you set in Step 5. If your password contains special characters like `@`, `#`, or `%`, you must URL-encode them. For example, `p@ss` becomes `p%40ss`.

Step 8c — After `.mongodb.net/`, add the name of the database you want your app to use. For example: `myAppDB`. If this database does not exist yet, MongoDB will create it automatically the first time your app writes data to it.

Your final string should look like this:

```
mongodb+srv://appUser:yourPassword@cluster0.abcde.mongodb.net/myAppDB?retryWrites=true&w=majority
```

---

**Step 9 — Add it to your `.env` file**

Open your `.env` file and paste it in:

```
MONGO_URI=mongodb+srv://appUser:yourPassword@cluster0.abcde.mongodb.net/myAppDB?retryWrites=true&w=majority
```

---

## Important Reminders

- Never commit your `.env` file to Git. Make sure `.env` is listed in your `.gitignore` file.
- If you forget your database password, you cannot recover it — but you can reset it in the "Database Access" panel on Atlas.
- The free M0 cluster gives you 512 MB of storage, which is more than enough for development and small projects.
