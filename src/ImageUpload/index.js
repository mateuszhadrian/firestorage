import React, { Component } from "react";
import  { storage, database} from "../Firebase/index";

class ImageUpload extends Component {
  constructor() {
    super();

    this.state = {
      image: null,
      url: ""
    }
  }

  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image: image}));
    }
  };


  handleShowAll = () => {
    storage.ref("images").listAll().then(data => {
      console.log(data.items)
    })
  }

  handleUpload = () => {

    const image = this.state.image;

    storage.ref(`images/${image.name}`).put(image).on("state_changed",
        snap => {console.log(snap)}, 
        error => {console.log(error)},
        () => {storage.ref("images").child(image.name).getDownloadURL().then(url => {
            this.setState({ url: url });
            const imgName = image.name;
            const imgURL = url;
            database.ref('imageURLs').child(imgName.substring(0, imgName.length - 5)).set({
              URL: imgURL
            });
          });
      }
    );
  };

  
  render() {
    return (
      <div>
        
        <div>
            <div>
                <input type="file" onChange={this.handleChange} />
            </div>
            <div>
                <input type="text" />
            </div>
        </div>

        <button onClick={this.handleUpload}>Upload</button>
        <button onClick={this.handleShowAll}>Show all</button>

        <img src={this.state.url}/>

      </div>
    );
  }
}

export default ImageUpload;