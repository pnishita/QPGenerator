import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../../service/subject.service';
import { Subject } from '../../model/subject.model';
import { CommonModule } from '@angular/common';
import { AddSubjectComponent } from '../add-subject/add-subject.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  standalone: true,
  imports: [CommonModule, AddSubjectComponent],
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  subjects: Subject[] = [];
  showAddSubject = false; // This property controls the visibility of the Add Subject form

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data: Subject[]) => {
        this.subjects = data;
      },
      (error) => {
        console.error('Error fetching subjects:', error);
        alert('Error fetching subjects. Please try again.');
      }
    );
  }

  onSubjectClick(subjectId: number): void {
    this.router.navigate(['/questions', subjectId]);
  }

  toggleAddSubject(): void {
    this.showAddSubject = !this.showAddSubject; // Toggle the visibility of the Add Subject form
  }

  onSubjectAdded(newSubject: Subject): void {
    this.subjects.push(newSubject); 
  }
}
