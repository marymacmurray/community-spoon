//**************Click event listener generating list of Meals by Cuisine Type************** */

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
  return mealResponse
  // console.log(mealResponse);
}

cuisineSelectbutton.addEventListener('click', async () => {

  const cuisineTypeSelected = cuisineDropdown[cuisineDropdown.selectedIndex].value;
  // console.log(cuisineTypeSelected);
  let response = await axios.get(`${MEALSDB_URL}${MEALSDB_API_KEY}filter.php?a=${cuisineTypeSelected}`)
    .then(meals => {
      let res = meals.data.meals
      let cuisinedMeals = res.map(async (meal) => {
        // console.log(meal.idMeal)
        let info = await getMealbyId(meal.idMeal)
        // console.log(info)
        let newDiv = document.createElement("div")
        newDiv.classList.add("mealDiv")
        let newMealbutton = document.createElement("button")
        newMealbutton.classList.add("mealButton")
        newMealbutton.innerHTML = "Step 2";
        newMealbutton.addEventListener('click', () => {
          build3courses(info.data.meals[0], info)
        })
        newDiv.innerHTML =
          `<h1 class="mealdivTitle">${info.data.meals[0].strMeal}</h1><br>
          <img src="${info.data.meals[0].strMealThumb}" class="mealDivimg" alt="${info.data.meals[0].strMeal} recipe photo" width="300" height="200"><br><a href="${info.data.meals[0].strYoutube}" target="_blank">Check out the recipe!</a><br>`
        //   <h2>${meal.strInstructions}</h2>
        // console.log(newDiv.innerHTML)

        document.querySelector("#videoZone").appendChild(newDiv)
        document.querySelector("#videoZone").appendChild(newMealbutton)

      })
      // console.log(cuisinedMeals)
    }
    ).catch(error => {
      console.log(error);
    })
}
)
allCuisinetypes();

//*****identify selected meal category, if/else to choose complimentary meal photos*****/

function build3courses(selectedMeal, info) {
  // console.log(selectedMeal);
  if (selectedMeal.strCategory === "Dessert")//Dessert
  {
    const listNotdessert = info.filter(meal => info.strCategory !== "Dessert");
    console.log(listNotdessert);
  }
  else if (selectedMeal.strCategory === "Starter" || selectedMeal.strCategory === "Side")  //Appetizer
  {
    const listNotstarter = info.filter(meal => info.strCategory !== "Starter");
    console.log(listNotstarter);
  }
  else if (selectedMeal.strCategory === "Breakfast")//Breakfast
  {
    const listIsbreakfast = info.filter(meal => info.strCategory === "Breakfast");
    console.log(listIsbreakfast);
  }
  else {
    const listNotEntree = info.filter(meal => info.strCategory !== "Beef" || info.strCategory !== "Chicken" || info.strCategory !== "Goat" || info.strCategory !== "Lamb" || info.strCategory !== "Miscellaneous" || info.strCategory !== "Pasta" || info.strCategory !== "Pork" || info.strCategory !== "Seafood" || info.strCategory !== "Vegan" || info.strCategory !== "Vegetarian");
    console.log(listNotEntree);
  };
  return build3courses();
}
//******This is the list of strCategory values from the API, these are like dish types.*** */
    // "strCategory": "Breakfast"

    // "strCategory": "Beef"
    // "strCategory": "Chicken"
    // "strCategory": "Goat"
    // "strCategory": "Lamb"
    // "strCategory": "Miscellaneous"
    // "strCategory": "Pasta"
    // "strCategory": "Pork"
    // "strCategory": "Seafood"
    // "strCategory": "Vegan"
    // "strCategory": "Vegetarian"

    // "strCategory": "Side"
    // "strCategory": "Starter"

  // "strCategory": "Dessert"

//********Hard code randomuser photos and name******/

// const randomUser_BASE_URL = 'https://randomuser.me/api/?results=2&?inc=name,location,picture';
// const dropdown = document.querySelector('#userselect');
// const userDisplay = document.querySelector('#user-info');


// selectedMealdiv.addEventListener('click', async () => {
//   let users = await axios.get(`${randomUser_BASE_URL}`)
//     .then(res => {
//       console.log(res);
//       // let user = res.data.results[0];
//       // let userDiv = document.createElement("div")
//       // console.log(userDiv);
//       // userDiv.classList.add("userDiv")
//       // userDiv.innerHTML =
//       //   `<img src="${user.picture.large}" class="userDivimg" target="_blank" alt="$user photo" width="300" height="200">
//       //   <h1>${user.name.first}</h1>`
//       // document.querySelector("#userinfo").appendChild(userDiv)
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }
// )

// addEventListener
// if strCategory of selected meal


//*******RandomUser generated on click*********


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