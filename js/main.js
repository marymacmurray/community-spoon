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

//****.map feeds each individual axios call by ID******** */

const getMealbyId = async (id) => {
  let mealResponse =
    await axios.get(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${id}`)
  return mealResponse
  // console.log(mealResponse);
}


//***Main Event Listener: Category (aka cuisine type) -> Meal -> Complimentary Meal of same category + Random user***/

cuisineSelectbutton.addEventListener('click', async () => {
  let allMealsById = []
  const cuisineTypeSelected = cuisineDropdown[cuisineDropdown.selectedIndex].value;
  // console.log(cuisineTypeSelected);
  let response = await axios.get(`${MEALSDB_URL}${MEALSDB_API_KEY}filter.php?a=${cuisineTypeSelected}`)
    .then(meals => {
      let res = meals.data.meals
      console.log(res)
      let cuisinedMeals = res.map(async (meal) => {
        // console.log(meal.idMeal)
        let info = await getMealbyId(meal.idMeal)
        allMealsById.push(info)
        // console.log(info)
        let newDiv = document.createElement("div")
        newDiv.classList.add("mealDiv")
        let newMealbutton = document.createElement("button")
        newMealbutton.classList.add("mealButton")
        newMealbutton.innerHTML = "Step 2";
        newMealbutton.addEventListener('click', () => {
          // console.log(res, info)
          buildAllcourses(allMealsById, info)
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

//*****identify selected meal's category, if/else to choose 1 complimentary meal*****/

function buildAllcourses(allMeals, selectedMeal) {
  // console.log(allMeals, selectedMeal)//allMeals is the new array allMealsbyId of that nationality (aka cuisine type, aka strArea)
  let secondCourse = []
  let dishCategory = selectedMeal.data.meals[0].strCategory//this is the category of the meal they clicked on.
  // console.log(dishCategory)
  if (dishCategory === "Dessert")//Dessert: If category of dish they click on is Dessert, grab all objects in allMeals array that are NOT Dessert.
  {
    const listNotdessert = allMeals.filter(meal => {
      if (meal.data.meals[0].strCategory !== "Dessert") {
        // console.log(meal.data.meals[0].strCategory)
        return meal;
      }
    })
    // console.log(listNotdessert)
    secondCourse.push(listNotdessert);
  }

  else if (dishCategory === "Starter" || dishCategory === "Side")//Starter: If category of dish they click on is Starter, grab all objects in allMeals array that are NOT Starter.
  {
    const listNotstarter = allMeals.filter(meal => {
      if (meal.data.meals[0].strCategory !== "Starter" || meal.data.meals[0].strCategory !== "Side") {
        // console.log(meal.data.meals[0].strCategory)
        return meal
      }
    })
    // console.log(listNotstarter)
    secondCourse.push(listNotstarter);
  }

  else if (dishCategory === "Breakfast")//Breakfast: If category of dish they click on is Breakfast, grab all objects in allMeals array that are Breakfast.
  {
    const listBreakfast = allMeals.filter(meal => {
      if (meal.data.meals[0].strCategory === "Breakfast") {
        // console.log(meal.data.meals[0].strCategory)
        return meal
      }
    })
    // console.log(listBreakfast)
    secondCourse.push(listBreakfast);
  }

  else {
    const listNotEntree = allMeals.filter(meal => { //If Entree, list all other meals not Entree.
      if (meal.data.meals[0].strCategory !== "Beef" || meal.data.meals[0].strCategory !== "Chicken" || meal.data.meals[0].strCategory !== "Goat" || meal.data.meals[0].strCategory !== "Lamb" || meal.data.meals[0].strCategory !== "Miscellaneous" || meal.data.meals[0].strCategory !== "Pasta" || meal.data.meals[0].strCategory !== "Pork" || meal.data.meals[0].strCategory !== "Seafood" || meal.data.meals[0].strCategory !== "Vegan" || meal.data.meals[0].strCategory !== "Vegetarian")
        // console.log(meal.data.meals[0].strCategory)
        return meal
    })
    // console.log(listNotEntree)
    secondCourse.push(listNotEntree);
  }
  // console.log(secondCourse)
  const random2ndmeal = secondCourse[0][Math.floor(Math.random() * secondCourse[0].length)];
  const random3rdmeal = secondCourse[0][Math.floor(Math.random() * secondCourse[0].length)];
  //console.log(random3rdmeal);

  let firstCoursetitle = `${selectedMeal.data.meals[0].strMeal}`
  let firstCoursePic = `${selectedMeal.data.meals[0].strMealThumb}`

  const firstCourseMealDiv = document.createElement("div")
  firstCourseMealDiv.classList.add("mealdiv")
  firstCourseMealDiv.innerHTML = `<h1 class="mealdivTitle">${firstCoursetitle}</h1><br>
  <img src="${firstCoursePic}" class="mealDivimg" alt="${firstCoursetitle} recipe photo" width="300" height="200"><br>`
  document.querySelector("#userselect").appendChild(firstCourseMealDiv)


  let secondCoursetitle = `${random2ndmeal.data.meals[0].strMeal}`
  let secondCoursePic = `${random2ndmeal.data.meals[0].strMealThumb}`


  const secondCourseMealDiv = document.createElement("div")
  secondCourseMealDiv.classList.add("mealdiv")
  secondCourseMealDiv.innerHTML = `<h1 class="mealdivTitle">${secondCoursetitle}</h1><br>
  <img src="${secondCoursePic}" class="mealDivimg" alt="${secondCoursetitle} recipe photo" width="300" height="200"><br>`
  document.querySelector("#userselect").appendChild(secondCourseMealDiv)


  let thirdCoursetitle = `${random3rdmeal.data.meals[0].strMeal}`
  let thirdCoursePic = `${random3rdmeal.data.meals[0].strMealThumb}`

  const thirdCourseMealDiv = document.createElement("div")
  thirdCourseMealDiv.classList.add("mealdiv")
  thirdCourseMealDiv.innerHTML = `<h1 class="mealdivTitle">${thirdCoursetitle}</h1><br>
  <img src="${thirdCoursePic}" class="mealDivimg" alt="${thirdCoursetitle} recipe photo" width="300" height="200"><br>`
  document.querySelector("#userselect").appendChild(thirdCourseMealDiv)



}





//******This is the list of strCategory values from the API, these are like dish types.*** */
    // "strCategory": "Breakfast"

    // "strCategory": "Dessert"

    //**ENTREES** */
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

    //**APPETIZER** */
    // "strCategory": "Side"
    // "strCategory": "Starter"


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