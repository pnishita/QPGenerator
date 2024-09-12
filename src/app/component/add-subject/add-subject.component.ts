import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../../service/subject.service';
import { Subject } from '../../model/subject.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent {
  subjectForm: FormGroup;

  @Output() subjectAdded = new EventEmitter<Subject>();

  constructor(private fb: FormBuilder, private subjectService: SubjectService) {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.subjectForm.valid) {
      const newSubject: Subject = this.subjectForm.value;

      this.subjectService.addSubject(newSubject).subscribe({
        next: (addedSubject: Subject) => {
          this.subjectAdded.emit(addedSubject); // Emit the event after adding subject
          this.subjectForm.reset();
        },
        error: (err) => {
          console.error('Error adding subject:', err);
        }
      });
    }
  }
}
