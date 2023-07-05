import "./Styles/AccountSettings.css"

import defAvatar from "../../Media/avatardef.svg"

import { useState, useCallback } from "react"

import { useNavigate } from "react-router-dom";

function AccountSettings({ userData, setUserData, logined, setLogined, setInvokeStatus, invokeStatus }) {
    let navigate = useNavigate();
    let [fileUpl, setFileUpl] = useState(false);
    const setWarning = useCallback((el, text) => {
        el.parentElement.querySelector(".AccountSettings__warning").innerText = ""
        el.parentElement.querySelector(".AccountSettings__warning").innerText += text
        return false
    }, [])

    let handleFileChange = (e) => {
        if (e.target.files[0]) {
            if ((e.target.files[0].size * (10 ** (-6))) <= 1.5) {
                setWarning(e.target, "")
                setFileUpl(URL.createObjectURL(e.target.files[0]))

            } else {
                setWarning(e.target, "The size of your image is too large. The maximum allowed size is 1.5MB. Please compress the image and attempt the upload again.")
                e.target.value = ""
                setFileUpl(false)
            }
        }
    }

    let avatarSaveHandler = (e)=>{
        let file = e.target.parentElement.querySelector(".AccountSettings__file-inp").files[0];
        if (file) {
            let data = new FormData();
            data.append("avatar", file);
            fetch("https://brain-battle-server-wpcm.onrender.com/auth/changeAvatar", {
                method: "POST",
                headers: {
                    "Authorization": `Baerer ${localStorage.getItem("userToken")}`
                },
                body: data
            })
            .then(res=>res.json())
            .then(data=> {
                if (data.status === "ok") {
                    setUserData({});
                    setInvokeStatus(!invokeStatus);
                    alert("Successfully changed")
                } else {
                    alert("Your session expiered. Please re-login and try again");
                    navigate("/logIn")
                    setLogined(false)
                    setUserData({});
                    sessionStorage.clear();
                    localStorage.clear();
                }
            })
            .catch(e=>console.log(e))
        }
    }
    return (
        <section className="AccountSettings">
            <h2 className="AccountSettings__headline">Account settings</h2>
            <div className="AccountSettings__section">
                <div className="AccountSettings__group">
                    <h3 className="AccountSettings__headline AccountSettings__headline_3">Avatar</h3>
                    <div className="AccountSettings__row">
                        <img height={150} width={150} src={fileUpl ? fileUpl : (userData.photoFile?.contentType || userData.photo) ? (userData.photoFile?.contentType) ? `data:${userData.photoFile.contentType};base64,${userData.photoFile.data}` : userData.photo : defAvatar} alt="preview" className="AccountSettings__avatar-preview" />
                        <div className="AccountSettings__file-field">
                            <label className="AccountSettings__file-btn" htmlFor="settings-avatar-file">Choose new avatar</label>
                            <input onChange={handleFileChange} accept="image/*" type="file" id="settings-avatar-file" className="AccountSettings__file-inp" />
                            <div className="AccountSettings__warning"></div>
                            <button onClick={avatarSaveHandler} className="AccountSettings__save-btn">Save</button>
                        </div>
                    </div>
                </div>
                <div className="AccountSettings__group">
                    <h3 className="AccountSettings__headline AccountSettings__headline_3">Personal info</h3>
                    <div className="AccountSettings__row">
                        <label className="AccountSettings__placeholder">Name</label>
                        <input defaultValue={userData.name} type="text" className="AccountSettings__input" />
                        <div className="AccountSettings__warning"></div>
                    </div>
                    <div className="AccountSettings__row">
                        <label className="AccountSettings__placeholder">Email</label>
                        <input defaultValue={userData.email} type="email" className="AccountSettings__input" />
                        <div className="AccountSettings__warning"></div>
                    </div>
                    <button className="AccountSettings__save-btn">Save</button>
                </div>
            </div>
        </section>
    )
}

export default AccountSettings