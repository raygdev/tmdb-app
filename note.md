1) figure out performance issues with page loading and content shifting on load. image sources coming from somewhere else. How to set a preconnect or preload on the image?

2) How can I keep the base url for the API calls while still rendering different views for my Slider component?
Need to make the Slider more flexible and reusable.

3) Conditionally render the Genre name to the Genre page depending on what was previously selected.

4) how to minimize state in other components to declutter each component or page? Which components actually need state?

5) Using a boolean to refresh the Movies page when a related title is clicked.  Is this best practice? Changed to rerender when the id form params change to reload movie page.

6) Seeing hard coded content flicker before loader gets rendered to the page. How to fix? UI definitley needs work.

7) In the Genres page component, when clicking on prev or next button, momentarily see the state update to the number before the loader div renders. Should I use a ref on the loader div in the useEffect hook? But ref isn't used to change state... how would this work? Would I need to perform clean-up in useEffect with the ref? Currently not rendering loader when page is loading after navigating to genre page.

8) Figure out why it is needed to provide a conditional to ensure there is a value in state before I map over the state when one of my pages mounts. Why don't I have to do it with the initial render of the Home page component when the App mounts? No initial state with those property names. Had to create an initial state with same structure so errors wouldn't persist.

9) figure out how to use @loadable/component to perform 'lazy' loading. Loadable component used for server side rendering. Have not yet learned how to server-side render react components

10) figure out what lazy loading actually is under the hood.

11) React router is used for ssr, and react docs tell you not to use suspend or lazy with ssr, to use loadable component instead. But searching information on react router, they use lazy and suspend with it. Is this best practice? does this actually work? I used it in my application and it seems to have helped performance on the desktop tests increasing by about 25%. Still no help on the mobile tests though. Where to get clarification? Currently not server side rendering.

12) fix content shifting for mobile.

13) when a movie is selected inside the movie page, rerender and focus back to top of page. -- used a scroll to top component from react router dom documentation. Works on the Movie page, but will not work on the genre page. How to fix? Adding window.scrollto in useEffect.

14) Try to solve duplicate picture problem in crew Slider.
how to  solve? create new set? Hashed duplicates to return only one render of a picture if more the value already exists. But some have mulitple roles in crew. Have to set a value for that so that no duplicates exist for pictures, but multiple roles can be rendered.

15) could not find a working solution when navigating back with browser buttons. Found useLocation and adding storing the call in a variable called location and using location.key as a dependency in useEffect seems to do the trick.

16) Little experiment to see if the same can be done if using the useParams id parameter?  -- Adding the id to each dependency seems to work. Will re-render when the Id parameter changes and runs the effect. Useful with using browser navigation buttons. Both forward and back. Calling from an api entails that Id is unique to each object that comes back, same for key prop in react. Expects unique identifier. Id would be a unique Identifier therefore changing ids will alter the dependency and allow the effect to rerender the app. What other things can you pass as a dependency?

17) ReactDOM.createRoot will cancel out the effect of using ID or locaiton.key not allowing the page to refresh? is it because it is keeping track of previous state and not allowing the page to re-render? Found React.useStrict is causing issues with components mounting and remounting allowing components to be destroyed. Removed useStrict to stop the effect.

18) Found a way to pass other perameters so that i could render the proper genre in the genre page and conditionally call to the proxy based on motion picture type tv or movie to get the proper render of the motion picture requested.

19) Need to fix the loading state when getting a different movie or tv view in the show or movie page. currently loading with defective UI showing no movie or show view before load. How to set a loading state when calling to the proxy until return each time?