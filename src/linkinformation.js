var LinkPreview = require("react-native-link-preview");

exports.linkInformation = ({ link }) =>
  LinkPreview.getPreview(link)
    .catch(e => ({ title: link }))
    .then(({ title }) => ({
      title,
      date: new Date().toDateString()
    }));
