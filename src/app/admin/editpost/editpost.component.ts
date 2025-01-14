import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ListData, ListService } from 'src/app/service/list.service';


@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  
  constructor(
    public listservice: ListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  posteditForm = new FormGroup({
    'title': new FormControl(Validators.required, Validators.minLength(5)),
    'author': new FormControl(Validators.required, Validators.minLength(9)),
    'content': new FormControl(Validators.required, Validators.minLength(12)),
}) ;
itemId:number=0;
item:any = null;
postData:any={  };
title:string="";
author:string="";
content:string="";


  ngOnInit(): void {    

    this.route.params.subscribe(p => {
      if(p['id'])
        this.itemId = p['id'];
    });

    //getpost Values
    this.getListData();
}
getListData(){
  
  this.item = this.listservice.lists.find(item =>item.id == this.itemId);
  
  if(this.item){
  this.posteditForm.controls['title'].setValue( this.item.title);
  this.posteditForm.controls['author'].setValue(this.item.author);
  this.posteditForm.controls['content'].setValue(this.item.content);
  }
}
//Call Edit Method to Update change
edit(){
  const curr = this.posteditForm.value;
  if(this.item){
    this.item.author = curr.author;
    this.item.content = curr.content;
    this.item.title = curr.title;
  }
  this.router.navigate(['dashboard']);
}
}






























// {  
// itemId:number=0;
// postData:any={  };
// title:string="";
// author:string="";
// content:string="";
// "posteditForm":FormGroup; 
//   constructor(
//           public listservice: ListService,
//           private router: Router,
//           private route: ActivatedRoute
//   ) { 
//     this.route.params.subscribe(params=>{
//      this.itemId = +params['id'];
//     //  console.log(params,this.listservice.lists )
//      this.postData = this.listservice.lists.find((item)=>{
//       if(item.id==this.itemId ){
//          return true
//       }
//       return false
//      })
//      console.log(this.postData);
     
//      this.title=this.postData.title;  
//      this.author=this.postData.author;
//      this.content=this.postData.content;
//     });
//    }


//   ngOnInit(): void {
//     this.posteditForm= new FormGroup({
//       "title":new FormControl(),
//        "author": new FormControl(),
//        "content": new FormControl()
//     })

//   }
//   edit(){
//     console.log(this.posteditForm.value)
//     this.postData=this.listservice.lists.map((item)=>{
//       if(item.id==this.itemId)
//       {
//         item.title=this.title;
//         item.author=this.author;
//         item.content=this.content;
//        return true
//       }
//        return false
//     })
//     this.router.navigate(['dashboard']);
//   }


// }