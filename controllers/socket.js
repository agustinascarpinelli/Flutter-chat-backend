const User=require('../models/user')
const Message=require('../models/msg')

const userConnected =async(uid='')=>{
const user=await User.findById(uid);
user.online=true;
await user.save();
return user;
}

const addFriends = async (uid='', idFriend='') => {
    try {
      const user = await User.findById(uid);
      const friend = await User.findById(idFriend);
      
      if (!friend) {
        throw new Error('User does not exist');
      }
  
      const isAfriend = friend.friends.find(friend=>friend._id==uid)
 
  
      if (isAfriend) {
        let newArray = friend.friends.map((friendObj) => {
          if (friendObj._id == uid) {
            return {
              ...friendObj,
              status: 'confirmed'
            };
          } else {
            return friendObj;
          }
        });
      
       
        friend.friends=newArray;
        await friend.save();
    

        const newFriend = {
            _id: friend._id,
            name: friend.name,
            status: 'confirmed',
          };
          user.friends.push(newFriend);
         
          await user.save();


      } else {
        const newFriend = {
          _id: friend._id,
          name: friend.name,
          status: 'pending',
        };
        user.friends.push(newFriend);
        
        await user.save();
      }
      
      return { success: true };
    } catch (error) {
      console.log(error);
      return { success: false, error: error.message };
    }
  };
  


const userDisconnected =async(uid='')=>{
    const user=await User.findById(uid);
    user.online=false;
    await user.save();
    return user;
    }


    const saveMessage =async(payload)=>{
        /*
        payload:
        {
            from:'',
            to:'',
            msg:''
        }
        */
try{

const message=new Message(payload);
await message.save()


return true
}catch(error){
    console.log(error)
}
    }

module.exports={
    userConnected,
    userDisconnected,
    saveMessage,
    addFriends,

}