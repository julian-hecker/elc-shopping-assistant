# Shopping Assistant

> This project was created as a submission for the [Estée Lauder Companies Accessible Beauty Hackathon](https://elchackathon.devpost.com/).

We created an application that makes it easy for blind and visually impaired users to gain information about products by using the device camera.

## Background

According to the [Vision Loss Expert Group](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5820628/), in 2015 there were over 250 million people with moderate-to-severe visual impairment (MSVI), including 36 million people who were totally blind -- with these statistics only expected to grow over time.

Many things that sighted people take for granted are especially difficult for the visually impaired. Something seemingly as simple as shopping presents a wide array of problems, including accessing basic information about the products they buy.

Improving technologies offer the ability to improve the experience for non-sighted shoppers -- so we have created an application which leverages smartphone technology to improve the shopping experience for all visually impaired individuals

## Our Solution

We created a smartphone application that makes it easy for people with low vision to get information about products using just the device camera.

When you open the app, it will try to identify any objects visible to the camera and speak them to you. If you point the camera at a product's barcode, it will give you all the product's information.

### How to use

1. Pick up an item at the store
2. Open the app and point the camera at the item
3. Listen for object recognition feedback, e.g. "water bottle"
4. Move the item around until the barcode scans
5. Listen to the product's details spoken aloud

<!-- Insert gif of working demo -->

## Impact

While there are already applications that perform barcode scanning, current solutions have some significant issues:

- Prohibitive costs: [KNFB Reader](https://nfb.org/programs-services/knfb-reader) costs $99.99 to download.
- Limited availability: [Microsoft's Seeing AI](https://www.microsoft.com/en-us/ai/seeing-ai) is only available for iOS, which comprises only about a quarter of the global smartphone market.
- Poor UX: current solutions do not provide feedback on visible objects.

Our solution addresses these issues and more:

- Completely free to download and use without advertisements.
- Available for Android and iOS, which together make up more than 99% of the global smartphone market.
- Recognized objects are spoken out loud for better user experience
- Database has over 600 million registered products.
  <!-- - Spoken feedback when a barcode is detected makes it easier to scan -->

## Technical Details

We built the user interfeace for the mobile application using [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/). This makes it easy to run our project on any Android or iOS smartphone without having to duplicate code, and also easy to distribute during development without having to go through each platform's app store.

We are leveraging several device API's that allow for using the camera, text-to-speech, audio feedback.

By using Google's [MobileNet models](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet), we are able to run fast and lightweight object recognition on-device. This enables users to gain more details about any items they are looking at with the camera

To obtain product information once we have a barcode number, we can use [barcodelookup.com](https://www.barcodelookup.com/) to query their database with over 600,000,000 product entries. The application requests the product's page and retrieves the product's name, description, image, and attributes.

> Note: Some distinct products have the same barcode, which can occasionally result in incorrect product details.

Once presented with product details, the details are read aloud using text-to-speech or the user's configured accessibility tools such as iOS's VoiceOver.

## Moving Forward

There are certain issues with the current version of the application we would like to address in upcoming versions.

- It's hard to scan a barcode if you can't see where it is.
  - This can be solved by using a lightweight Tensorflow.js model trained to recognize the position of blurry or occluded barcodes.
  - Based on the bounding box coordinates returned by the model, it would be possible to say "move camera down" or "move closer" to get a clearer view of barcodes.
- Object recognition is prone to mistakes.
  - MobileNetV2 is rather outdated as it was released in 2018. Using a newer model is sure to provide more accurate results.

## Try It Out!

[Shopping Assistant](https://expo.dev/@julianheckerdev/shopping-assistant) is available now with [Expo Go](https://expo.dev/client) -- a platform used to distribute and test React Native applications on mobile devices.

To be released shortly to the Google Play and Apple App Stores

## Contributors

<table>
  <thead>
    <tr>
      <th><a href="https://github.com/julian-hecker">Julian Hecker</th>
      <th><a href="https://github.com/rosierjolie">Geraldine Turcios</a></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img alt="Julian Hecker Profile Picture" src="https://media.licdn.com/dms/image/C4D03AQH1j0Faalg4WA/profile-displayphoto-shrink_200_200/0/1611771864729?e=1682553600&v=beta&t=6BiiWh5-izT_9CMBMN7eSlr7vUCfMnw-_T2h9GaZo0s" /></td>
      <td><img alt="Geraldine Turcios Profile Picture" src="https://media.licdn.com/dms/image/D5603AQEjBytgTfROcA/profile-displayphoto-shrink_200_200/0/1675366301000?e=1682553600&v=beta&t=-7RckILKmkD036ybcYbdFcPpfY70qGAO0Nrj5tf5GFU" /></td>
    </tr>
    <tr>
      <td>Full Stack Engineer</td>
      <td>iOS & UX Engineer</td>
    </tr>
    <tr>
      <td>React Native Application</td>
      <td>User Experience, Accessibility</td>
    </tr>
  </tbody>
</table>

## Resources

- [TensorFlow.js](https://github.com/tensorflow/tfjs)
- [Pre-trained TensorFlow.js models](https://github.com/tensorflow/tfjs-models)
- [How to recognise real time object in React Native for dummies](https://www.bam.tech/article/how-to-recognize-real-time-object-in-reactnative-for-dummies)
- [Custom object detection in the browser using TensorFlow.js](https://blog.tensorflow.org/2021/01/custom-object-detection-in-browser.html)
- [Introduction to Text to Speech and Speech Recognition using React-native](https://dev.to/josethz00/introduction-to-text-to-speech-and-speech-recognition-using-react-native-3oi)
- [MobileNet Object Recognition Model](https://github.com/tensorflow/tfjs-models/tree/master/mobilenet)
