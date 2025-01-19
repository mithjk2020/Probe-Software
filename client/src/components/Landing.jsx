import React, { useState } from 'react';
import "./landing.css";
import Navbar from './Navbar';

function Home() {
    const [userImage, setUserImage] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [link, setLink] = useState("");
    const [randomImage, setRandomImage] = useState(null);
    const [imageLink, setImageLink] = useState("");
    const [liked, setLiked] = useState(false);
    const [canGetImage, setCanGetImage] = useState(false);

    const handleUserImageChange = (e) => {
        setUserImage(e.target.files[0]);
        checkIfCanGetImage();
    };

    const handleUploadImageChange = (e) => {
        setUploadImage(e.target.files[0]);
        checkIfCanGetImage();
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!userImage || !uploadImage || !link) {
            alert("Please fill in all the fields.");
            return;
        }
    
        const formData = new FormData();
        formData.append("person", userImage); 
        formData.append("costume", uploadImage); 
        formData.append("link", link); 
    
        try {
            const response = await fetch("http://localhost:5000/probe/backend", { // Updated backend URL
                method: "POST",
                body: formData,
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log("Response from backend:", result);

                // Display the costume image and link from the response
                alert(`Form submitted successfully! \nLink: ${result.link}`);
                
                // Recheck if both images are uploaded and enable the Get Image button
                checkIfCanGetImage();
            } else {
                console.error("Error from backend:", response.statusText);
                alert("Failed to submit form. Please check your inputs and try again.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const handleGetImage = async () => {
        try {
            const response = await fetch("http://localhost:5000/getImage"); // GET request to backend
            if (response.ok) {
                const result = await response.json();  // Parse the response as JSON
                const imageUrl = result.image_url; // Get the image URL from the response
                setRandomImage(imageUrl); // Store the image URL
            } else {
                console.error("Error fetching image:", response.statusText);
                alert("Failed to fetch image. Please try again.");
            }
        } catch (error) {
            console.error("Error during image fetch:", error);
            alert("An error occurred while fetching the image.");
        }
    };
    

    const handleImageLinkChange = (e) => {
        setImageLink(e.target.value); // Update the link for the random image
    };

    const checkIfCanGetImage = () => {
        // Enable Get Image button only if both images are uploaded
        if (userImage && uploadImage) {
            setCanGetImage(true);
        } else {
            setCanGetImage(false);
        }
    };

    const handleLikeToggle = () => {
        setLiked(!liked); // Toggle the like status
    };

    return (
        <div className='landingParent'>
            <Navbar />
            <div className="container">
                <h1>Upload Your Images and Link</h1>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="form-group">
                        <label>Upload Your Image:</label>
                        <input type="file" accept="image/*" onChange={handleUserImageChange} required />
                    </div>
                    <div className="form-group">
                        <label>Upload Costume Image:</label>
                        <input type="file" accept="image/*" onChange={handleUploadImageChange} required />
                    </div>
                    <div className="form-group">
                        <label>Enter Link:</label>
                        <input
                            type="text"
                            value={link}
                            onChange={handleLinkChange}
                            placeholder="https://example.com"
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>

                {/* Add the Get Image button */}
                <button 
                    onClick={handleGetImage} 
                    className="get-image-button" 
                    disabled={!canGetImage} // Disable the button if user has not uploaded images
                >
                    Get Image
                </button>

                {/* If a random image is fetched, display it below the form */}
            {randomImage && (
                    <div className="image-display">
            <img src={`http://localhost:5000${randomImage}`} alt="Random" />
            
            {/* Like button for the random image */}
                <div className="button-container">
                    <button onClick={handleLikeToggle} className="like-button">
                        {liked ? "❤️ Liked" : "🤍 Like"}
                    </button>

                    {/* Download button */}
                    <a 
                        href={`http://localhost:5000${randomImage}`} 
                        download 
                        className="download-button"
                    >
                        📥 Download
                    </a>
                </div>
            </div>
                )}
            </div>
        </div>
    );
}

export default Home;
