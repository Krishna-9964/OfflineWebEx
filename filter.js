var btn = document.querySelector("#search")

btn.addEventListener('click',printHistory);

function printHistory()
{
    var from = document.getElementById('from').value;
    var to = document.getElementById('to').value;
    var from_date = new Date(from);
    var to_date = new Date(to);
    to_date.setHours(0,0,0,0)
    from_date.setHours(0,0,0,0)

    if(from_date>to_date || from === '' || to === '' || from_date > new Date())
    {
        window.alert("Enter valid date");
        document.getElementById('from').value = null;
        document.getElementById('to').value = null;
    }
    else{
        getHistory(from_date,to_date);
    }
    // console.log("From : " +from + " To : "+to);
    
}

function getHistory(from_date,to_date)
{

    // Calculate the difference in milliseconds between the two dates
    var timeDiff = Math.abs(from_date.getTime() - to_date.getTime());

    // Convert milliseconds to days
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if(daysDiff==0)
        to_date = new Date();

    // console.log("The number of days between the two dates is: " + daysDiff);

 

    const numberOfDays = daysDiff;  // Replace with the desired number of days

    // Calculate the start and end times based on the current date
    const endTime = to_date.getTime();
    const startTime = to_date;
    startTime.setDate(startTime.getDate() - numberOfDays);
    startTime.setHours(0, 0, 0, 0);

    console.log(endTime + " : "+startTime)
    // Create the query object with the specified time range
    const query = {
      text: '',              // Search for all URLs (empty string matches all)
      startTime: startTime.getTime(),
      endTime: endTime,
      maxResults : 1000000
    };
      
    var ul = document.getElementById("records");
      chrome.history.search(query, function(results) {
        // console.log(results[0])
        for(i=results.length-1;i>=0;i--)
        {
            let result = results[i]
            console.log(new Date(results[i].lastVisitTime))

            let date = new Date(result.lastVisitTime);
            let date_mod = '' + date.getDate().toString().padStart(2, "0") + "-"+(date.getMonth()+1).toString().padStart(2, "0") + "-" + date.getFullYear();
            var li = document.createElement('li');
            li.setAttribute('class','list-group-item');

            let a = document.createElement('a');
            a.href = result.url;
            a.innerText = result.title;

            let p = document.createElement('p');
            p.innerText = date_mod;

            let button = document.createElement('input');
            button.setAttribute('type','button');
            button.setAttribute('class','btn btn-outline-danger');
            button.setAttribute('value','Delete');

            li.appendChild(a);
            li.appendChild(p);
            li.appendChild(button);
            ul.appendChild(li);
        }


        // results.forEach(function(result) {
        //     console.log(result)
        //     let date = new Date(result.lastVisitTime);
        //     let date_mod = '' + date.getDate() + "-"+date.getMonth() + "-" + date.getFullYear();
        //     var li = document.createElement('li');
        //     li.setAttribute('class','list-group-item');

        //     let a = document.createElement('a');
        //     a.href = result.url;
        //     a.innerText = result.title;

        //     let p = document.createElement('p');
        //     p.innerText = date_mod;

        //     let button = document.createElement('input');
        //     button.setAttribute('type','button');
        //     button.setAttribute('class','btn btn-outline-danger');
        //     button.setAttribute('value','Delete');

        //     li.appendChild(a);
        //     li.appendChild(p);
        //     li.appendChild(button);
        //     ul.appendChild(li);

        // });
      });
}
