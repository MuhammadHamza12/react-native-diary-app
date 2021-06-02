import { AuthContext, NotesContext } from 'context';
import React, { useContext, useEffect } from 'react'
import LocalService from 'services/LocalService';
import { Async_Constants } from 'utils';

export default function BasicSetup({children}) {
    const authContext = useContext(AuthContext);
    const notesContext = useContext(NotesContext);
    console.log('check context: ',authContext)
    const { userData } = authContext;
    const getTourInformation = async () => {
        let database_users = await LocalService.getDataAsObject(Async_Constants.database_users);
        console.log('database_users: ',database_users);
        let getData = await LocalService.getDataAsStringKeyPairs(Async_Constants.isTourCompleted);
        if(getData !== null){
           let data = await LocalService.getDataAsStringKeyPairs(Async_Constants.isTourCompleted) == 'true'
            authContext.setUserData({...userData,isTourCompleted:data})
        }
        if(getData == null || typeof getData == 'undefined'){
            let setData = await LocalService.storeDataAsStringKeyPairs(Async_Constants.isTourCompleted,'false');
            console.log('check set tour value: ',setData);
        }
    }
    const getAndSetAuthInformation = async () =>{
        let getData = await LocalService.getDataAsObject(Async_Constants.auth_details);
        console.log('local data: for auth Details: ',getData);
        if(getData !== null){
            console.log('in not null data auth information')
            console.log('auth info:v',getData['isAuth'])
            if(getData['isAuth']){
                console.log('auth',getData['isAuth'])
                authContext.setUserData({...getData,isAuth:true})
            } else{
                console.log('not in auth',getData['isAuth'])
                authContext.setUserData({...getData,isAuth:false})
            }
        }
        if(getData == null || typeof getData == 'undefined'){
            let getData = await LocalService.getDataAsObject(Async_Constants.auth_details);
            console.log('get data in basic: ',getData);
            let setData = await LocalService.storeDataAsObject(Async_Constants.auth_details,authContext.userData);
            console.log('check set tour value: ',setData);
        }
    }
    const getAndSetNotesInformation = async () =>{
        console.log('log notes',notesContext);
        let getData = await LocalService.getDataAsObject(Async_Constants.notes_details);
        console.log('local data: for notes Details: ',getData);
        if(getData !== null){
            console.log('in not null data auth information')
            console.log('auth info:v',getData)
            let data = await LocalService.getDataAsObject(Async_Constants.notes_details);
            notesContext.setNotesData({...notesContext.notes,...data})
        }
        if(getData == null || typeof getData == 'undefined'){
            console.log('check context before store into local storage:',notesContext);
            let getData = await LocalService.getDataAsObject(Async_Constants.notes_details);
            
            console.log('get data in basic: ',getData);
            let setData = await LocalService.storeDataAsObject(Async_Constants.notes_details,notesContext.notes);
            console.log('check set tour value: ',setData);
        }
    }

    useEffect(async()=>{
        await getTourInformation();
        await getAndSetAuthInformation();
        await getAndSetNotesInformation();
    },[]);

    return children;
}
