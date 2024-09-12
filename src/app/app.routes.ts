import { Routes } from '@angular/router';
import { SubjectListComponent } from './component/subject-list/subject-list.component';
import { QuestionListComponent } from './component/question-list/question-list.component';
import { AddSubjectComponent } from './component/add-subject/add-subject.component';
import { GeneratorComponent } from './component/generator/generator.component';
import { HomeComponent } from './component/home/home.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    { path: 'questions', component: QuestionListComponent },
    
    { path: 'questions/:subjectId', component: QuestionListComponent },

    {
        path:"subjects",
        component:SubjectListComponent
    },
    {
        path:"questions",
        component:QuestionListComponent
    },
    {
        path:"addsubjects",
        component:AddSubjectComponent
    },
    {
        path:"generate",
        component:GeneratorComponent
    },
    
   
];
