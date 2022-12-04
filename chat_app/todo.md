[Overall]
1. User authentication.
    - Login or register.
2. Chat channel - one or more users can send messages.
    - 2.1: User sends a message, all users in the application can see it.
3. Light and Dark mode support.

[DONE]:
1. Deletion and submit upon enter key press.
2. Fixed window positioning issue.
3. Added styling on send-btn:press.


[BUGS] / [DESIGN]

[bug]: hitting enter when not in focus on input still causes a re-render? It throws an app level log, not sure.



[Todo]:
1. Connect chat btn to input.
    - Submit and enter to state.
2. Design another component for the display current messages?


[CT]:
    - Connecting send button to input.
    - deletion upon submission

    - Notes:
    - logged at onClick, not throwing log - 
    handleSubmit isn't successfully setting the draft - and it's also not getting any defined values from event. 



Note: I probably bit off more than I can chew here - so I'm going to stop this project, do a few simplier projects first.

Basically where I stopped is that I was looking in how to model my chat application's database with firebase, and I got overwhelmed, and realised that I needed to go back and make a more basic application before this one.

