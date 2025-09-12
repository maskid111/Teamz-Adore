# Teamz Adore - Quick Start Guide

## ✅ Firebase Configuration Complete!

Your Firebase configuration has been successfully updated in all files:
- `admin.html` - Admin panel with your Firebase project
- `index.html` - Main website with your Firebase project  
- `firebase-config.js` - Configuration file

## 🚀 Next Steps to Get Started

### 1. Enable Required Firebase Services

Go to your [Firebase Console](https://console.firebase.google.com/project/teamz-adore) and enable:

#### **Firestore Database**
1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode"
4. Select a location (recommend: us-central1)
5. Click "Done"

#### **Authentication**
1. Go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Click "Save"

#### **Storage**
1. Go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose "Start in test mode"
4. Select the same location as Firestore
5. Click "Done"

### 2. Create Admin User

1. In Firebase Console, go to "Authentication" > "Users"
2. Click "Add user"
3. Enter admin email (e.g., admin@teamzadore.com)
4. Enter a strong password
5. Click "Add user"
6. **Save these credentials!** You'll need them to access the admin panel.

### 3. Set Up Security Rules

#### **Firestore Rules**
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
  }
}
```

#### **Storage Rules**
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

### 4. Test Your Setup

1. **Open Admin Panel**: Open `admin.html` in your browser
2. **Login**: Use the admin credentials you created
3. **Add a Product**: 
   - Click "Add Product"
   - Fill in product details
   - Upload an image
   - Click "Add Product"
4. **Check Main Site**: Open `index.html` to see your product appear

## 🎯 What You Can Do Now

### **Admin Panel Features**
- ✅ **Add Products**: Name, category, price, stock, description, image
- ✅ **Edit Products**: Update any product information
- ✅ **Delete Products**: Remove products with confirmation
- ✅ **Image Upload**: Upload product images to Firebase Storage
- ✅ **Real-time Sync**: Changes appear instantly on main website

### **Main Website Features**
- ✅ **Dynamic Products**: Products load from Firebase
- ✅ **WhatsApp Ordering**: Direct ordering via WhatsApp
- ✅ **Mobile Responsive**: Works perfectly on all devices
- ✅ **Naira Pricing**: All prices in Nigerian Naira

## 🔧 Troubleshooting

### **If you can't login to admin panel:**
- Check that Authentication is enabled in Firebase Console
- Verify the admin user was created successfully
- Check browser console for error messages

### **If products don't appear on main site:**
- Check that Firestore Database is enabled
- Verify the security rules are set correctly
- Check browser console for error messages

### **If image upload fails:**
- Check that Storage is enabled in Firebase Console
- Verify the Storage security rules are set correctly
- Check browser console for error messages

## 📱 Testing Checklist

- [ ] Admin panel loads without errors
- [ ] Can login with admin credentials
- [ ] Can add a new product with image
- [ ] Product appears on main website
- [ ] Can edit existing products
- [ ] Can delete products
- [ ] Main website loads products from Firebase
- [ ] WhatsApp ordering works
- [ ] Mobile responsive design works

## 🎉 You're Ready!

Your Teamz Adore website with admin panel is now fully configured and ready to use! 

**Admin Panel**: `admin.html`
**Main Website**: `index.html`

Start adding your products and watch them appear on your main website in real-time!
