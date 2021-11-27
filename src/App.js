import tw from "tailwind-styled-components";
import {Data,Deck,Details,Span,Card,Button} from './components' ;
import { useEffect,useState } from "react";
import Loader from "./components/Loader";
import { useFetch } from "./hooks/useFetch"


const colors=[
  "pink",
  "purple",
  "indigo",
  "blue",
  "green",
  "yellow",
  "red",
  "gray",
  "orange",
  "lime"

];


const Wrapper = tw.div`
    h-full
    flex flex-row justify-center items-center
    
    
`


const Alert = tw.p `
bg-white
px-6
py-4
font-bold
text-4xl
fixed inset-0
`

const URL = "https://randomuser.me/api/?results=1";



function App() { 

  const [user,setuser] = useState(null);
  const [color,setcolor] = useState("blue");
  const [alert,setalert] = useState(false);
  //const [loading,setloading] = useState(false)
  const {response,loading,error,fetchData} = useFetch(URL,{})


  useEffect(()=>{
      if(response)
      {
        const person = response.results[0];

        const {cell,email,gender} = person;
        const {large:image} = person.picture;
        const {first,last} = person.name;
        const {date:dob} = person.dob;
        const {age} = person.dob;
        const{
          location:{city,state},
        }= person;
    
        const newUser = {
          image,
          name:`${first} ${last}`,
          dob,
          gender,
          city,
          state,
          cell,
          age,
          email
        };
        setuser(newUser);
        setcolor(colors[Math.floor(Math.random()*8)]);

      }
  },[response])

  const dateFormator = (entry) =>{
      return entry
      .slice(0,10)
      .split("-")
      .reverse()
      .join("-")
  }

  const capitalize = (entry)=>{
    return entry
    .slice(0,1)
    .toUpperCase()
    + entry.slice(1)
  }

  const copy=(text)=>{
      return navigator.clipboard.writeText(text);
  }

  // const usefetch = async()=>{
  //   try{
  //     setloading(true)
  //     const response = await fetch(URL);
  //     const data = await response.json();
  //     setloading(false)
  //     const user = data.results[0];
      
  //     const {cell,email,gender} = user;
  //     const {large:image} = user.picture;
  //     const {first,last} = user.name;
  //     const {date:dob} = user.dob;
  //     const {age} = user.dob;
  //     const{
  //       location:{city,state},
  //     }= user;
  
  //     const newUser = {
  //       image,
  //       name:`${first} ${last}`,
  //       dob,
  //       gender,
  //       city,
  //       state,
  //       cell,
  //       age,
  //       email
  //     };
  //     setuser(newUser);
  //     setcolor(colors[Math.floor(Math.random()*8)]);
    
  //   }
  //   catch(error)
  //   {
  //       console.log(error);
  //       setloading(false)
  //   }
  // }

  //   useEffect(()=>{
  //     usefetch();
  //   },[])

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setalert(false)
    },500)


      return () =>{
        clearTimeout(timeout)
      }
    
  },[alert])


  if(error)
  {
    console.log(error.message);
    <h1>{error.message}</h1>
  }


  return (
    <>
    {loading && <Loader />}
    < Wrapper className={`bg-gradient-to-t from-${color}-400 via-${color}-50 to-${color}-300`}>
      {alert && <Alert>Copied to clipboard 📋 </Alert>}
      <Deck>
        <Card className={`bg-gradient-to-r from-${color}-400 via-${color}-500 to-${color}-800`} user = {user}>
          <Details>
            {user && 
            Object.entries(user).map((entry,index)=>{
              if(index !==0)
            {
              return(
                <Data
                  key = {index}
                  title = "Click to copy"
                  onClick = {()=>{
                    setalert(true);
                    copy(entry[1]);
                  }}
                  >

                  <Span  index = {index} entry ={entry}
                  />
                  :{" "}
                  {
                    index === 2
                      ? dateFormator(entry[1])
                    :index === 7 
                    ? entry[1]:capitalize(entry[1])
                  }

                  
                </Data>
              )
            }

            return null;
            })}
          </Details>
        </Card>
      </Deck>
      <Button className={`transition duration-500 ease-in-out text-${color}-600 hover:bg-${color}-200 transform hover:-translate-y-1 hover:scale-110 ...`}
      
      onClick={fetchData}
        
      
>NEXT🢂</Button>
    </ Wrapper>
    </>
  );
}

export default App;


