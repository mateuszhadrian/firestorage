import React, { Component } from "react";
import storage from "../Firebase/index";

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
        console.log(e.target.files);
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {

    const { image } = this.state;

    storage.ref(`images/${image.name}`).put(image).on("state_changed",
        snap => {console.log(snap)}, 
        error => {console.log(error)},
        () => {storage.ref("images").child(image.name).getDownloadURL().then(url => {
            this.setState({ url })
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
        <img src={this.state.url}/>

      </div>
    );
  }
}

export default ImageUpload;