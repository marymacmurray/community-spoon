// NO API required for Axios calls.
const BASE_URL = 'https://randomuser.me/api/?results=5000&?inc=name,location,picture';
const dropdown = document.querySelector('#userselect');
const userSelectbutton = document.querySelector('#user-select-button');
const userDisplay = document.querySelector('#user-info');
const cuisineDropdown = document.querySelector('#cuisine');
const cuisineSelectbutton = document.querySelector('#cuisine-select-button')
const videoZone = document.querySelector('#videoZone')

const MEALSDB_URL = 'https://www.themealdb.com/api/json/v2/'
const MEALSDB_API_KEY = '9973533/'

let allCuisinetypes = async () => {
  await axios.get(`${MEALSDB_URL}${MEALSDB_API_KEY}list.php?a=list`)
    .then(res => {
      // console.log(res);
      const cuisineTypeList = res.data.meals;
      // console.log(cuisineTypeList)
      for (let i = 0; i < cuisineTypeList.length; i++) {
        cuisineDropdown.innerHTML += `<option id=${cuisineTypeList[i].strArea}>${cuisineTypeList[i].strArea}</option>`
      }
    })
    .catch(error => {
      console.log(error);
    })
}
allCuisinetypes();


const getMealbyId = async (id) => {
  let mealResponse =
    await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`)
  console.log(mealResponse);
}

cuisineSelectbutton.addEventListener('click', async () => {

  const cuisineTypeSelected = cuisineDropdown[cuisineDropdown.selectedIndex].value;
  // console.log(cuisineTypeSelected);
  let response = await axios.get(`${MEALSDB_URL}${MEALSDB_API_KEY}filter.php?a=${cuisineTypeSelected}`)
    .then(meals => {
      let res = meals.data.meals
      let cuisinedMeals = res.map(meal => {
        // console.log(meal.idMeal)
        getMealbyId(meal.idMeal)
        let newDiv = document.createElement("div")
        newDiv.innerHTML = `<h3>${meal.strMeal}</h3><img src="${meal.strMealThumb}" alt="${meal.strMeal} recipe photo" width="300" height="200">`
        // console.log(newDiv.innerHTML)
        document.querySelector("#videoZone").appendChild(newDiv)
      })
      // console.log(cuisinedMeals)
    }
    ).catch(error => {
      console.log(error);
    })
}
)
allCuisinetypes();


//*******RandomUsers API calls. DON'T TOUCH BELOW THIS LINE!*********


// let users = async () => {
//   await axios.get(`${ BASE_URL }`)
//     .then(res => {  //this res is a variable.  it could be pineapple. 
//       //.then causes the axios call object returned to be passed to res.  
//       console.log(res);

//       // let userDiv = res.data.results[0].picture.large;
//       let userUS = res.data.results
//       // console.log(userUS)
//       let userNY = userUS.filter(user => {
//         return user.location.state === "New York";
//       })
//       console.log(userNY)
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }
// users();