## Common Engineering Standard (CES) 

Issue this section with every project brief. It is referenced by sections 7, 8, 15, 16 and 17 of every project specification in section 3, so those sections contain only the project-specific deltas. 

A note on standards and student teams. These requirements are deliberately not softened for students. A team that ships without tests, without CI, without an API specification or without server-side authorisation has not learned the thing this programme exists to teach, and has produced software the institution cannot operate. What is adjusted for students is scope, not standard – fewer modules, built properly. Where a specific requirement is genuinely beyond a semester, the mentor records the deviation in week 2 and the panel assesses against the recorded scope. 

A note on the two tracks. Every project in this document can be built on either track. The choice is made by the team in week 1 and recorded in the design document; it is not changed afterwards. The two tracks are not equivalent in difficulty for every project, and §1.9 says plainly which projects favour which track. 

### Tech Stack
this project leverages next.js for most of its functionality, with typescript as the primary programming language.

<!-- important node modules here -->
`Tailwind CSS`
`Lucide`
`shadcn/ui`


I will be using primarily `Tailwind CSS` for ui design.

## Problem Chosen
### P05 – Mess Demand Forecasting and Food-Waste Management
1. **Project Title** 
- Meal Demand Forecasting and Food-Waste Reduction Platform. Track J: Next.js + Node.js + MongoDB, plus an optional Python forecasting service. Track P: Django + PostgreSQL, forecasting in-process. 

2. **Project Overview Description.** 
- Forecasts attendance for each meal service using historical attendance and calendar context, converts the forecast into preparation and ingredient quantities via recipe data, captures post-service actuals – prepared, served, leftover – and reports waste quantity and cost with forecast-accuracy feedback. Problem. Kitchens prepare against registered strength, not actual demand. Demand varies with menu, weekday, holidays, examinations and events. Over-preparation is routine, waste is unmeasured, and its cost is invisible. Target users. Students, kitchen staff, mess managers, mess administrators, finance officers. Expected outcome. Measurable reduction in avoidable waste, a documented cost saving, and a planning loop that improves each cycle. 

3. **Project Objectives**
- Maintain menus, dishes, recipes, portion sizes and ingredient mappings 
- Capture meal attendance reliably per service 
- Forecast attendance per meal using history plus calendar features 
- Convert the forecast to preparation quantities and an ingredient indent 
- Capture post-service actuals and compute waste quantity and cost 
- Report forecast accuracy and high-waste dishes to drive menu and process change 