import { Component, Inject } from '@angular/core';
import { AdminService } from '../../store/service';
import { IUser } from '../../store/types';
import { MatDialog } from '@angular/material/dialog';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AddUserDialogComponent } from '../../components/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from '../../components/edit-user-dialog/edit-user-dialog.component';
import { Subscription, debounceTime, distinctUntilChanged } from 'rxjs';
import { initializeApp } from '@angular/fire/app';
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/modules/auth/store/state';
import { AuthService } from 'src/app/modules/auth/store/service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  public isLoading = false;
  public users!: IUser[];
  public email!: any;
  private subscription$: Subscription = new Subscription();
  public formSearch: UntypedFormGroup = this.fb.group({
    search: '',
  });
  user!: any;
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog,
    private fb: UntypedFormBuilder,
    private toast: HotToastService,
    private store: Store
  ) {}

  ngOnInit() {
    // let user = this.store.selectSnapshot(AuthState.user);
    this.authService.getUser().subscribe((user) => {
      // console.log(user);
      this.user = user;
    });
  }

  // let user = {
  //   email: userCredential?.user?.email,
  //   level: 1,
  //   points: 0,
  //   uid: uid,
  // };

  updateUser() {
    let user = { ...this.user };
    console.log(user);

    // this.adminService.updateUser(this.user?.uid, this.user)
  }

  // newDocumentData = {
  //   name: 'John Doe',
  //   age: 25,
  //   city: 'New York',
  // };

  // addDocument() {
  //   this.firestore
  //     .collection('users')
  //     .add(this.newDocumentData)
  //     .then((docRef) => {
  //       console.log('Document added with ID: ', docRef.id);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });
  // }
}
