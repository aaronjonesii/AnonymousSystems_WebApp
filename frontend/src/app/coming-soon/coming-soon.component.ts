import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '../services/notification.service';
import { LocalStorageService } from '../services/local-storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'anon-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  currentApplicationVersion = environment.appVersion;
  isSubscribed = false;

  emailForm = new FormGroup({email: new FormControl('')});
  submitted = false;

  constructor(
    private db: AngularFirestore,
    private notificationService: NotificationService,
    private localStorage: LocalStorageService,
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.emailForm?.invalid) {return}
    const email_address = this.emailForm?.value.email
    this.addSubscriber(email_address);
  }

  addSubscriber(email: string) {
    let docRef = this.db.collection('newsletter-list').doc(email);
    docRef.get().toPromise()
      .then((doc) => {
        if (doc.exists) {
          this.notificationService.sendNotification("❌ Email address already subscribed.");
        } else {
          this.db.collection('newsletter-list').doc(email).set({dateAdded: Date.now()})
            .then(() => {
              this.isSubscribed = true;
              this.notificationService.sendNotification("✅ Successfully subscribed your email address. Welcome!");
            })
            .catch((error) => {
              console.error(error);
              this.notificationService.sendNotification("❌ Sorry, something went wrong. Try again.");
            });
        }
      })
      .catch((error) => {
        console.error(error);
        this.notificationService.sendNotification("❌ Sorry, something went wrong. Try again.");
      })
  }

  removeSubscriber(email: string) {
    let docRef = this.db.collection('newsletter-list').doc(email);
    docRef.get().toPromise()
      .then(async (doc) => {
        if (doc.exists) {
          const res = await this.db.collection('newsletter-list')
            .doc(email)
            .delete()
            .then(() => {
              this.notificationService.sendNotification("✅ Successfully unsubscribed your email address. You're golden.");
              // this.openSnackBar("Successfully unsubscribed your email address. You're golden.", "Dismiss")
            })
            .catch((error) => {
              console.error(error);
              this.notificationService.sendNotification("❌ Sorry, something went wrong. Try again.");
              // this.openSnackBar("Sorry, something went wrong. Try again.", "Dismiss")
            });
        } else {
          this.notificationService.sendNotification("❌ Email address was never subscribed here. You're golden.");
          // this.openSnackBar("Email address was never subscribed here. You're golden.", "Dismiss")
        }
      })
      .catch((error) => {
        console.error(error);
        this.notificationService.sendNotification("❌ Sorry, something went wrong. Try again.");
        // this.openSnackBar("Sorry, something went wrong. Try again.", "Dismiss")
      })
  }

  clearLocalStorage() {
    this.localStorage.clearAllLocalStorage();
  }

}
