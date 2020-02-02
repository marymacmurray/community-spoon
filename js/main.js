// NO API required for Axios calls.
const BASE_URL = 'https://randomuser.me/api/';
const dropdown = document.querySelector('#userselect');
const tryMebutton = document.querySelector('#try-me');
const userDisplay = document.querySelector('#user-info');


let users = async () => {
  await axios.get(`${BASE_URL}?seed`)
    .then(res => {  //this res is a variable.  it could be pineapple. 
      //.then causes the axios call object returned to be passed to res.  
      //.then is SAME AS: remove all of .then and .catch but you wouldn't see what was happening and get your error back unless you declare the variable:{const myCategories = await axios.get ...,{"x-api-key":API_KEY}})
      console.log(res);
      let userDiv = res.data.results[0].picture.large;
      let userLocatP = res.data.results[0].location.country;
      let user
      userDisplay.innerHTML = `<img src=${userDiv} id="userImg"><p>${userLocatP}</p>`;
      const userCountry = res.data.results[0].location.country;
      // for (let i = 0; i < userCountry.length; i++) {
      //   dropdown.innerHTML += `<option id=${userCountry[i].}> ${userinfo[i].name.}</option>`
      // }
    }
    )
    .catch(error => {
      console.log(error);
    })
}

tryMebutton.addEventListener('click', async () => {
  const categoryId = dropdown[dropdown.selectedIndex].id;
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?category_ids=${categoryId}`,//this is when you go to the API docs and get the image id info.  everything after the 'search?' is the query parameter.
    )
    // console.log(response);
    const catPhoto = response.data[0].url; //dig into the doc to find what the name is.
    picDisplay.innerHTML = `<img src=${catPhoto}>`
  } catch (error) {
    console.log(error);
  }
})

// window.addEventListener('load', async () => {
//   const categoryId = dropdown[dropdown.selectedIndex].id;
//   try {
//     const response = await axios.get(`https://api.thecatapi.com/v1/images/search?category_ids=${categoryId}`,//this is when you go to the API docs and get the image id info.  everything after the 'search?' is the query parameter.
//     )
//     // console.log(response);
//     const catPhoto = response.data[0].url; //dig into the doc to find what the name is.
//     picDisplay.innerHTML = `<img src=${catPhoto}>`
//   } catch (error) {
//     console.log(error);
//   }
// })

users();