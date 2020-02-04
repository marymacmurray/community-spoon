// NO API required for Axios calls.
const BASE_URL = 'https://randomuser.me/api/?results=5000&?inc=name,location,picture';
const dropdown = document.querySelector('#userselect');
const userSelectbutton = document.querySelector('#user-select-button');
const userDisplay = document.querySelector('#user-info');
const cuisineDropdown = document.querySelector('#cuisine');
const cuisineSelectbutton = document.querySelector('#cuisine-select-button')

const MEALSDB_URL = 'https://www.themealdb.com/api/json/v2/'
const MEALSDB_API_KEY = '9973533/'

let meals = async () => {
  await axios.get(`${MEALSDB_URL}${MEALSDB_API_KEY}list.php?a=list`)
    .then(res => {
      console.log(res);
      const cuisine = res.data.meals;
      console.log(cuisine)
      for (let i = 0; i < cuisine.length; i++) {
        cuisineDropdown.innerHTML += `<option id=${cuisine[i].strArea}>${cuisine[i].strArea}</option>`
      }
    })
    .catch(error => {
      console.log(error);
    })
}

// cuisineSelectbutton.addEventListener('click', async () => {
//   const cuisineCategory = cuisineDropdown[cuisineDropdown.selectedIndex].value;
//   try {
//     const response = await axios.get(`${MEALSDB_URL}`)
//       .then(res => {
//         console.log(res);
//       })
//   } .catch(error => {
//     console.log(error);
//   })
// })
meals();

let users = async () => {
  await axios.get(`${BASE_URL}`)
    .then(res => {  //this res is a variable.  it could be pineapple. 
      //.then causes the axios call object returned to be passed to res.  
      console.log(res);

      // let userDiv = res.data.results[0].picture.large;
      let userUS = res.data.results
      // console.log(userUS)
      let userNY = userUS.filter(user => {
        return user.location.state === "New York";
      })
      console.log(userNY)
    })
    .catch(error => {
      console.log(error);
    })
}
users();
  // cusineInput.addEventListener('click', async () => {
  //   const categoryId = cuisineInput.options[cuisineInput.selectedIndex].value;
  //   try {
  //     const response = await axios.get(`https://randomuser.me/api/?seed=${categoryId}`,//this is when you go to the API docs and get the image id info.  everything after the 'search?' is the query parameter.
  //     )
  //     // console.log(response);
  //     //     const catPhoto = response.data[0].url; //dig into the doc to find what the name is.
  //     //     picDisplay.innerHTML = `<img src=${catPhoto}>`
  //     //   } catch (error) {
  //     //     console.log(error);
  //     //   }
  // })

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