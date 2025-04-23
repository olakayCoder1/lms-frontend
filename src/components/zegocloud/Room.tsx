import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/ContextProvider';

export default function Room() {


    const {authUser} = useContext(AuthContext)


    const { id} = useParams();
    const role_str = authUser?.role === 'tutor' ? 'Host' : 'Student';
    // let role_str = getUrlParams(window.location.href).get('role') || 'Host';
    const role =
        role_str === 'Host'
        ? ZegoUIKitPrebuilt.Host
        // : role_str === 'Cohost'
        // ? ZegoUIKitPrebuilt.Cohost
        : ZegoUIKitPrebuilt.Audience;
        

    function randomID(len) {
        let result = '';
        if (result) return result;
        var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
          maxPos = chars.length,
          i;
        len = len || 5;
        for (i = 0; i < len; i++) {
          result += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return result;
    }


    // using useEffect check if the id == 'session' if not redirect to /dashboard
    useEffect(() => {
        if (id !== 'session') {
            window.location.href = '/dashboard';
        }
      }, []);



    // start the call
    let myMeeting = async (element) => {
        // Create instance object from Kit Token.
        const appID = 2126052914;
        const serverSecret = "9bdbe9c05e9aa78952e72d9734c5ba8d";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, id,  randomID(5),  authUser?.email);
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
        container: element,
        scenario: {
            mode: ZegoUIKitPrebuilt.LiveStreaming,
            config: {
            role,
            },
        },
        sharedLinks: [
            {
                name: "Live stream",
                url: window.location.protocol + "//" + window.location.host + "/livestream/" + id ,
            }
        ],
        });
    };

    return (
        <>
            <div
                className=""
                ref={myMeeting}
                // style={{ width: '100vw', height: '100vh' }}
                
                ></div>
        </>
    )
}


