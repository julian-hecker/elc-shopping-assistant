# Shopping Assistant (real name to be determined)

> This project was created as a submission for the [Estée Lauder Companies Accessible Beauty Hackathon](https://elchackathon.devpost.com/).

We created an application that makes it easy for blind and visually impaired users to gain information about products by using the device camera.

## Background

According to the [Vision Loss Expert Group](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5820628/), in 2015 there were over 250 million people with severe visual impairment, including 36 million people who were totally blind -- with these statistics only expected to grow over time.

Many things that sighted people take for granted are especially difficult for the visually impaired. Something seemingly as simple as shopping presents a wide array of problems, including accessing basic information about the products they buy.

Improving technologies offer the ability to improve the experience for non-sighted shoppers -- so we have created an application which leverages smartphone technology to improve the shopping experience for all visually impaired individuals

## Our Solution

We created a smartphone application that makes it easy for people with low vision to get information about products using just the device camera.

1. Pick up an item at the store
2. Open the app and point the camera at the item
3. Move the item until the barcode scans
4. Listen to the product's details spoken aloud
<!-- 4. Listen to feedback on positioning the product -->

<!-- Insert gif of working demo -->

## Impact

While there are already applications that perform barcode scanning, current solutions have some significant issues:

- Prohibitive costs: [KNFB Reader](https://nfb.org/programs-services/knfb-reader) costs $99.99 to download.
- Limited availability: [Microsoft's Seeing AI](https://www.microsoft.com/en-us/ai/seeing-ai) is only available for iOS, which comprises only about a quarter of the global smartphone market.
- Poor UX: [Digit-Eyes](http://www.digit-eyes.com) does not provide feedback when a barcode is visible, making it much harder to scan.

Our solution addresses these issues and more:

- Completely free to download and use without advertisements.
- Available for Android and iOS, which together make up more than 99% of the global smartphone market.
- Database has over 600 million registered products.
  <!-- - Spoken feedback when a barcode is detected makes it easier to scan -->
  <!-- - Question & Answer AI Chatbot lets users get all the information they need -->

## Technical Details

We built the user interfeace for the mobile application using [Expo](https://expo.dev/) / [React Native](https://reactnative.dev/). This makes it easy to run our project on any Android or iOS smartphone without having to duplicate code.

We are leveraging several device API's that allow for using the camera, text-to-speech, audio feedback.

<!-- By using [TensorFlow.js](https://www.tensorflow.org/js), we are able to run lightweight and accurate machine learning algorithms to detect whether there are any bar codes visible on the screen and provide auditory feedback to the user to more easily picture -->

To obtain product information once we have a barcode number, we can use [barcodelookup.com](https://www.barcodelookup.com/) to query their database with over 600,000,000 product entries. The application requests the product's page and retrieves the product's name, description, image, and attributes.

> Note: Some distinct products have the same barcode, which can occasionally result in incorrect product details.

Once presented with product details, the details are read aloud using text-to-speech or the user's configured accessibility tools such as iOS's VoiceOver.

<!-- The user also has the option to talk to a Artificial Intelligence Chatbot to ask questions about any products they have scanned. -->

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
