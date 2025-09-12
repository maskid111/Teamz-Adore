# Firebase Setup Guide for Teamz Adore

## Prerequisites
- A Google account
- Access to Firebase Console

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name: "Teamz Adore" (or your preferred name)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Required Services

### Firestore Database
1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location close to your users
5. Click "Done"

### Authentication
1. Go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

### Storage
1. Go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Select the same location as Firestore
5. Click "Done"

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Web" icon (</>) to add a web app
4. Enter app nickname: "Teamz Adore Web"
5. Check "Also set up Firebase Hosting" (optional)
6. Click "Register app"
7. Copy the Firebase configuration object

## Step 4: Update Configuration Files

### Update admin.html
Replace the Firebase configuration in `admin.html` (around line 30):
```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

### Update index.html
Replace the Firebase configuration in `index.html` (around line 795):
```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## Step 5: Set Up Admin User

1. Go to "Authentication" > "Users" in Firebase Console
2. Click "Add user"
3. Enter admin email and password
4. Click "Add user"
5. Note down these credentials for admin login

## Step 6: Configure Security Rules

### Firestore Rules
Go to "Firestore Database" > "Rules" and replace with:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products collection - readable by all, writable by authenticated users
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders collection - readable and writable by authenticated users only
    match /orders/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules
Go to "Storage" > "Rules" and replace with:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Step 7: Test the Setup

1. Open `admin.html` in your browser
2. Login with the admin credentials you created
3. Try adding a product with an image
4. Check if the product appears on the main website (`index.html`)

## Step 8: Deploy (Optional)

### Using Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Troubleshooting

### Common Issues:
1. **CORS errors**: Make sure your domain is added to authorized domains in Firebase Console
2. **Permission denied**: Check your Firestore and Storage rules
3. **Image upload fails**: Verify Storage rules allow authenticated uploads
4. **Products not loading**: Check browser console for errors and verify Firestore rules

### Security Notes:
- Change Firestore rules to production mode before going live
- Set up proper user roles and permissions
- Consider implementing admin-only access restrictions
- Regularly backup your Firestore data

## Support
For more help, refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Storage Rules](https://firebase.google.com/docs/storage/security/get-started)
