(function(){
    console.log("Welcome to the world of TypeScript....!");
    let numbers: number[]= [1,2,3,4,5];
    let objects: object[]=[{name:"John",age:30},
                        {name:"Jane",age:25}];

    console.log("Numbers:");

    numbers.forEach(element => {
        console.log(element);   
    });

    let integer:number=10;
    let bool:boolean=true;
    let str:string="Hello TypeScript";

    console.log(integer);
    console.log(bool);
    console.log(str);  
    
    // Union 
    let unionType: number | string;
    unionType = 42; // valid
    console.log(unionType);
    unionType = "Now I'm a string"; // valid
    console.log(unionType);

    let arr: number | string | boolean[] ;// this mean the array can contain numbers, strings, array of boolean values
    
    //Functions
    function add(num1:number, num2:number): number{
        return num1 + num2;
    }


})