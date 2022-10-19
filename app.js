const { Console } = require('console');
const express = require('express');
const fs = require("fs");
const ExpressError = require("./expressError");

const {
    convertAndValidateNumsArray,
    findMode,
    findMean,
    findMedian,
} = require("./helpers");
  
const app = express();

app.use(express.json()); 

app.get('/mean', (req, res, next) => {
    try {

        // checking if query string is passed or not
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        
        let numsAsStrings = req.query.nums.split(',');
        // check if anything bad was put in
        let nums = convertAndValidateNumsArray(numsAsStrings);

        // If nums is an ERROR
        if (nums instanceof Error) {
            throw new ExpressError(nums.message, 400);
        }

        let result = {
            operation: "mean",
            result: findMean(nums),
        };

        return res.json(result);

    } catch (e) {
        next(e);
    }
})
 
app.get('/median', (req, res, next) => {
    try {

        // checking if query string is passed or not
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        
        let numsAsStrings = req.query.nums.split(',');
        // check if anything bad was put in
        let nums = convertAndValidateNumsArray(numsAsStrings);

        // If nums is an ERROR
        if (nums instanceof Error) {
            throw new ExpressError(nums.message, 400);
        }

        let result = {
            operation: "median",
            result: findMedian(nums),
        };

        return res.json(result);
        
    } catch (e) {
        next(e);
    }
})

app.get('/mode', (req, res, next) => {
    try {
    
        // checking if query string is passed or not
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        
        let numsAsStrings = req.query.nums.split(',');
        // check if anything bad was put in
        let nums = convertAndValidateNumsArray(numsAsStrings);

        // If nums is an ERROR
        if (nums instanceof Error) {
            throw new ExpressError(nums.message, 400);
        }

        let result = {
            operation: "mode",
            result: findMode(nums),
        };

        return res.json(result);
    } catch (e) {
        next(e);
    }
})

app.get('/all', (req, res, next) => {
    try {
    
        // checking if query string is passed or not
        if (!req.query.nums) {
            throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400)
        }
        
        let numsAsStrings = req.query.nums.split(',');
        // check if anything bad was put in
        let nums = convertAndValidateNumsArray(numsAsStrings);

        // If nums is an ERROR
        if (nums instanceof Error) {
            throw new ExpressError(nums.message, 400);
        }

        let result = {
            "operation": "all",
            "mean": findMean(nums),
            "median": findMedian(nums),
            "mode": findMode(nums),
        };

        return res.json(result);
    } catch (e) {
        next(e);
    }
})

/** generic 404 error handler if no routes matches */

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found", 404);
  
    // pass the error to the next piece of middleware
    return next(err);
});
  
  
/** error handler */
  
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message,
    });
});
  

app.listen(3000, () => {
    console.log("Server running on port 3000")
});
  