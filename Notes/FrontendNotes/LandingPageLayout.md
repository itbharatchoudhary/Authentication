
# 🔥 1. Overall Layout Structure

This page has **3 main layers**:

```
1. Background (image + overlay)
2. Website-Logo-name (Top-left)
3. Hero Content (center-left)
4. Button for sign-in (bottom-right)
```


---

# 🎨 2. Background (MOST IMPORTANT PART)

### ✔ Image

* Full-screen 
* Slight blur + soft lighting

### ✔ Overlay

Dark gradient overlay to improve text readability

### Implementation


👉 This overlay is what gives that **premium feel**

---

# 🧭 3. Website-Logo-name (Top Section)

### Layout

* Left: Logo ("UGH")


### Design Details

* Minimal
* White text
* Spacing: large padding (like 40px)

---

# 🧠 4. Hero Section (Main Content)

### Layout

* Left aligned (NOT centered)
* Vertically centered


---

## 📝 Title

```
Join THEGAMEUNTOLD
Because Not Everything Is Meant to Be Seen
```


---

## 📄 Subtitle

Small paragraph under heading:

```
Not everything is meant to be told 
some things are meant to be discovered.
```

### Style

* Light gray text
* Smaller (~16px)
* Opacity reduced



---

# 📧 5.  Button (Key UI Element)



### Design:

* Rounded pill shape
* Dark transparent background
* Blur effect
* Button inside same container

Button for signin Send user to register 
And a button to go Login Mukhoserula 
---


# ✨ 7. Small Details (THIS IS WHAT MAKES IT PREMIUM)

### 🔹 Blur Background

* Use `backdrop-filter: blur(10px)`

### 🔹 Typography

Use modern fonts:

* Inter
* Poppins

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

---

### 🔹 Spacing System

* Left padding: 60–100px
* Vertical centering: flex


---

### 🔹 Button Hover Effect


---

### 🔹 Subtle Animation (Optional but 🔥)

```css
.hero {
  animation: fadeIn 1s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
}
```

---


---

Use:

* React + Vite
* Tailwind CSS (easier for this UI)


