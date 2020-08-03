import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../../store/actions/index';

const useStyles = makeStyles(theme => ({
   search: {
     position: 'relative',
     borderRadius: theme.shape.borderRadius,
     backgroundColor: fade(theme.palette.common.white, 0.15),
     '&:hover': {
       backgroundColor: fade(theme.palette.common.white, 0.25),
     },
     marginLeft: 0,
     width: '100%',
     [theme.breakpoints.up('sm')]: {
       marginLeft: theme.spacing(1),
       width: 'auto',
     },
   },
   searchIcon: {
     width: theme.spacing(7),
     color:'white',
     height: '100%',
     position: 'absolute',
     pointerEvents: 'none',
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'center',
   },
   inputRoot: {
     color: 'white',
   },
   inputInput: {
     padding: theme.spacing(1, 1, 1, 7),
     transition: theme.transitions.create('width'),
     width: '100%',
     [theme.breakpoints.up('sm')]: {
       width: 120,
       '&:focus': {
         width: 200,
       },
     },
   },
 }));

const SearchBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const textSearch = useSelector(state => state.movies.textSearch);
  const changetext = (e) => {
    dispatch(actions.textSearch(e.target.value))
  } 

  return (
    <div className={classes.search}>
      <InputBase
        value={textSearch}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onChange={changetext}
      />
    </div>
  )
};
 
export default SearchBar;