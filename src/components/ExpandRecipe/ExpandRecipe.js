import { useState, useEffect, createContext } from 'react';
import { Link, Route, Routes } from "react-router-dom";

import './ExpandRecipe.scss';
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import RecipeWalkthrough from '../RecipeWalkthrough/RecipeWalkthrough.js';
import Recipe from '../Recipe.js';
import TabBarRecipe from '../TabBarRecipe/TabBarRecipe.js';
import { PropTypes } from 'prop-types';
import { Typography, Checkbox, LinearProgress, Box, Button, FormControlLabel, FormGroup, SvgIcon, IconButton } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material/';
import { ReactComponent as BackArrow } from '../../img/backarrow.svg';
import { ReactComponent as Level1 } from './../../img/level1.svg'
import { ReactComponent as Level2 } from './../../img/level2.svg'
import { ReactComponent as Level3 } from './../../img/level3.svg'
import { ReactComponent as GlutenF } from './../../img/gluten.svg'
import { ReactComponent as Dairy } from './../../img/dairy.svg'
import { ReactComponent as Veget } from './../../img/vegetarian.svg'
import { ReactComponent as Pesca } from './../../img/pescatarian.svg'


// temp
import bchick from '../../img/newbake.png';
import { textTransform } from '@mui/system';

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" sx={{ transform: "scale(1,4)", borderRadius: 8, backgroundColor: `#E9E3DA`,"& .MuiLinearProgress-bar": {backgroundColor: `#CCCC52` } }} {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

export const ProgressContext = createContext();

function ExpandRecipe(props) {
    // const navigate = useNavigate();
    const [isCooking, setIsCooking] = useState(false);

    const recipeOverview = (
        <div class = "NavTabs">
            <TabBarRecipe recipe = {props.recipe}/>
            
            {isCooking === false ? <Button variant="contained" className="CookButton" onClick={() => setIsCooking(!isCooking)}> Start Cooking </Button> : <Button variant="contained" className="CookButton" onClick={() => setIsCooking(!isCooking)}> Stop Cooking </Button>}
            
        </div>
    );

    const recipeTitle = (
        <div className='headerContain'>
            <div class = "RTitle">
                {/* <Button variant="text" class='backButton' href="/browse" startIcon={<BackArrow/>}>Back</Button> */}
                <h2>{props.recipe.label}</h2>
            </div>
            <Button variant="text" class='backButton' href="/browse"><BackArrow className='backArrow'/>Back</Button>
        </div>
    )

    const instructions = (
        <div className='headerContain'>
            <div className='IHeader'>
                <h1  style={{color: 'var(--tomato)'}}>Instructions</h1>
            </div>
            <Button variant="text" class='backButton' onClick={() => setIsCooking(!isCooking)}><BackArrow className='backArrow'/>Exit</Button>
        </div>
    )

    const [progress, setProgress] = useState(0);
    
    return (
        <div>
            <ProgressContext.Provider value={{ progress, setProgress }}>
            <div class="Recipe">  
                <div class = "RecipeSidebar">
                    {isCooking ? <Box sx={{ width: '40%', ml: 19 }}>
                                        <LinearProgressWithLabel value={progress} />
                                    </Box> : null}
                    {isCooking ? <h3  style={{color: 'var(--poppyseed)', fontFamily:'filson-soft'}}>{props.recipe.label}</h3> : null}
                    <div class="RecipeTags">
                        <ul class="TagsList">
                            <li><Level1/> level 1</li>
                            <li>{props.recipe.ingredientLines.length} Ingredients</li>
                            {/* <li>{props.recipe.dietLabels[0]}</li> */}
                            {/* <li>{props.recipe.healthLabels[0]}</li> */}
                            <li>{props.recipe.instructions.length*3} min total time</li>
                        </ul>
                    </div>
                    <div class = "RecipeIngreds">
                        <h2>Ingredients</h2>
                        <ul class="IngredientsList">
                            {props.recipe.ingredientLines.map((ing) =>
                                 <li class="IndivIngred">{ing}</li>
                                )}
                        </ul>
                    </div>
                </div>
                <div class="RecipeOverview">
                    {!isCooking ? recipeTitle: instructions}
                        {isCooking ? <RecipeWalkthrough steps = {props.recipe.instructions} index={0}></RecipeWalkthrough>: recipeOverview}
                    
                </div>
            </div>
            </ProgressContext.Provider>
            {/* <Footer /> */}
        </div>
    );
}

export default ExpandRecipe;