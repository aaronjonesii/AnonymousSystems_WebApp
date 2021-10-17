import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  AngularFirestoreModule, USE_EMULATOR
} from '@angular/fire/compat/firestore';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { TestBed } from '@angular/core/testing';
import { environment } from '../environments/environment';

const randomString = () => (Math.random() + 1).toString(36).split('.')[1];
export const rando = () => [randomString(), randomString(), randomString()].join('');

describe('AngularFirestore', () => {
  let app: FirebaseApp;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, rando()),
        AngularFirestoreModule.enablePersistence()
      ],
      providers: [{ provide: USE_EMULATOR, useValue: ['localhost', 8080] }]
    });

    app = TestBed.inject(FirebaseApp);
    afs = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    app.delete().catch(() => undefined);
  });

  it('should be the properly initialized type',() => {
    expect(afs instanceof AngularFirestore).toBe(true);
  });

  it('should have an initialized Firebase app', () => {
    expect(afs.firestore.app).toBeDefined();
  });

  it('should create an AngularFirestoreDocument from a string path', () => {
    const doc = afs.doc('foo/bar');
    expect(doc instanceof AngularFirestoreDocument).toBe(true);
  });

  // it('should create an AngularFirestoreDocument from a reference', () => {
  //   const doc = afs.doc('foo/bar').ref;
  //   expect(doc instanceof AngularFirestoreDocument).toBe(true);
  // });

  it('should create an AngularFirestoreCollection from a string path', () => {
    const doc = afs.collection('foobars');
    expect(doc instanceof AngularFirestoreCollection).toBe(true);
  });

  // it('should create an AngularFirestoreCollection from a reference', () => {
  //   const doc = afs.collection('foobars').ref;
  //   expect(doc instanceof AngularFirestoreCollection).toBe(true);
  // });

  it('should throw on an invalid document path', () => {
    const singleWrapper = () => afs.doc('collection');
    const tripleWrapper = () => afs.doc('collection/doc/subcollection');
    expect(singleWrapper).toThrowError();
    expect(tripleWrapper).toThrowError();
  });

  if (typeof window === 'undefined') {
    it('should not enable persistence (Node.js)', (done) => {
      afs.persistenceEnabled$.subscribe(isEnabled => {
        expect(isEnabled).toBe(false);
        done();
      });
    });
  } else {
    it('should enable persistence', (done) => {
      afs.persistenceEnabled$.subscribe(isEnabled => {
        expect(isEnabled).toBe(true);
        done();
      });
    });
  }
});

describe('AngularFirestore without persistence', () => {
  let app: FirebaseApp;
  let afs: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig, rando()),
        AngularFirestoreModule
      ],
      providers: [
        { provide: USE_EMULATOR, useValue: ['localhost', 8080] }
      ]
    });

    app = TestBed.inject(FirebaseApp);
    afs = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    app.delete().catch(() => undefined);
  });

  it('should not enable persistence', (done) => {
    afs.persistenceEnabled$.subscribe(isEnabled => {
      expect(isEnabled).toBe(false);
      done();
    });
  });

});
