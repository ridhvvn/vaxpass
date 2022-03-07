import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, docData, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  nama: string;
  status: string;
  ic: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private firestore: Firestore) { }

  getid(): Observable<Note[]> {
    const notesRef = collection(this.firestore, 'vaksin');
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }

  searchid(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, 'vaksin/${id}');
    return docData(noteDocRef, { idField: 'id'}) as Observable<Note>;
  }

  addid(note: Note) {
    const notesRef = collection(this.firestore, 'vaksin');
    return addDoc(notesRef, note);
  }

  deleteid(note: Note) {
    const noteDocRef = doc(this.firestore, 'vaksin/${note.id}');
    return deleteDoc(noteDocRef);
  }
  
  updateid(note: Note) {
    const noteDocRef = doc(this.firestore, 'vaksin/${note.id}');
    return updateDoc(noteDocRef, {ic: note.ic, nama: note.nama, status: note.status});
  }
}
