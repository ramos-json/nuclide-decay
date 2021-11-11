var x=0;
var nuclides =[];   //global variables

//adding button functionality
document.getElementById("addlist").addEventListener("click",function(){
    window.table = document.getElementById("mytable");
    var nucliden = document.getElementById("nname").value;
    var halflife = document.getElementById("half").value;
    var activity = document.getElementById("activity").value;
    window.row = table.insertRow(-1);


    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = nucliden;
    cell2.innerHTML = halflife;
    cell3.innerHTML = activity;
    document.getElementById("myForm").style.display ="none";
    x++;

    var halfnum = parseFloat(halflife);
    var activnum = parseFloat(activity)
    nuclides.push(halfnum,activnum);

    calc(halfnum,activnum);
   
    
});

//adding button functionality
document.getElementById("addnew").addEventListener("click",function(){
    x++;
    if(x%2 != 0){
        document.getElementById("myForm").style.display ="block";  
    }
    else{
        document.getElementById("myForm").style.display ="none";
    }
   

}
);


function calc(half,activ){
    
    var oneday = Math.round((activ*Math.pow(0.5,(1/half)))*100)/100;
    var tenday =  Math.round((activ*Math.pow(0.5,(10/half)))*100)/100;
    var hundday =  Math.round((activ*Math.pow(0.5,(100/half)))*100)/100;
    var thousday =  Math.round((activ*Math.pow(0.5,(1000/half)))*100)/100;
    
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);

    cell4.innerHTML = oneday;
    cell5.innerHTML = tenday;
    cell6.innerHTML = hundday;
    cell7.innerHTML = thousday;
    days(half,activ);
}

/*Funciton to calculate 
number of days till decay of a sample*/

function days(half1,activ1){
    
    var found = false;
    var lowerLimit = 0;
    var upperLimit = 1000000;
    
    while((!found) && lowerLimit <= upperLimit ){
        var midPoint = Math.round((upperLimit+lowerLimit)/2);
        
        var decay = activ1*Math.pow(0.5,(midPoint/half1));
        var lower = activ1*Math.pow(0.5,((midPoint-1)/half1));
        

        if(decay < 1 && lower >= 1 && decay > 0){
            found = true;
            var cell8 = row.insertCell(7);
            cell8.innerHTML = midPoint;
            
            
            break;

        } else if(decay == 0 || decay < 1 ){
            upperLimit=midPoint-1;
        }else{
            lowerLimit = midPoint + 1;
        }
    }
    calc2();

}

/*function to calculate the total number of days 
for all samples to decay*/

function calc2(){
    var present = false;
    
    var lowerLimit = 0;
    var upperLimit = 1000000;
    while(!present && lowerLimit <= upperLimit){
        var midPoint = Math.round((upperLimit+lowerLimit)/2);
        var sum =0;
        var sumlow = 0;
        
        for(var i=1;i <= nuclides.length/2; i++){
            
            sum += nuclides[2*i - 1]*Math.pow(0.5,(midPoint/nuclides[2*i - 2]));
            sumlow += nuclides[2*i - 1]*Math.pow(0.5,((midPoint-1)/nuclides[2*i - 2]));
            
            
        }
        

        if(sum < 1 && sumlow >= 1 && sum > 0){
            present = true;
            document.getElementById("replacable").innerHTML = "Time for total activity to decay: " +midPoint +" days";
            
            
            break;

        } else if(sum == 0 || sum < 1 ){
            upperLimit=midPoint-1;
        }else{
            lowerLimit = midPoint + 1;
        }



    }

}