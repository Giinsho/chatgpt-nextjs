interface Message {
    text: string;
    createdAt: firebase.firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
        createdAt?: firebase.firestore.Timestamp;
    };  
}