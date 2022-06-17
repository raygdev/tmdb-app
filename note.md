1) figure out performance issues with page loading and content shifting on load. image sources coming from somewhere else. How to set a preconnect or preload on the image?

2) How can I keep the base url for the API calls while still rendering different views for my Slider component?
Need to make the Slider more flexible and reusable.

3) Conditionally render the Genre name to the Genre page depending on what was previously selected.

4) how to minimize state in other components to declutter each component or page? Which components actually need state?

5) Using a boolean to refresh the Movies page when a related title is clicked.  Is this best practice? 

6) Seeing hard coded content flicker before loader gets rendered to the page. How to fix? 

7) In the Genres page component, when clicking on prev or next button, momentarily see the state update to the number before the loader div renders. Should I use a ref on the loader div in the useEffect hook? But ref isn't used to change state... how would this work? Would I need to perform clean-up in useEffect witht the ref?

8) Figure out why it is needed to provide a conditional to ensure there is a value in state before I map over the state when one of my pages mounts. Why don't I have to do it with the initial render of the Home page component when the App mounts?

9) figure out how to use @loadable/component to perform 'lazy' loading. 

10) figure out what lazy loading actually is under the hood.

11) React router is used for ssr, and react docs tell you not to use suspend or lazy with ssr, to use loadable component instead. But searching information on react router, they use lazy and suspend with it. Is this best practice? does this actually work? I used it in my application and it seems to have helped performance on the desktop tests increasing by about 25%. Still no help on the mobile tests though. Where to get clarification?

12) fix content shifting for mobile.

13) when a movie is selected inside the movie page, rerender and focus back to top of page. -- used a scroll to top component from react router dom documentation. Works on the Movie page, but will not work on the genre page. How to fix?

14) Try to solve duplicate picture problem in crew Slider.
how to  solve? create new set?

15) could not find a working solution when navigating back with browser buttons. Found useLocation and adding storing the call in a variable called location and using location.key as a dependency in useEffect seems to do the trick.

16) Little experiment to see if the same can be done if using the useParams id parameter?  -- Adding the id to each dependency seems to work. Will re-render when the Id parameter changes and runs the effect. Useful with using browser navigation buttons. Both forward and back. Calling from an api entails that Id is unique to each object that comes back, same for key prop in react. Expects unique identifier. Id would be a unique Identifier therefore changing ids will alter the dependency and allow the effect to rerender the app. What other things can you pass as a dependency?

17) ReactDOM.createRoot will cancel out the effect of using ID or locaiton.key not allowing the page to refresh? is it because it is keeping track of previous state and not allowing the page to re-render?