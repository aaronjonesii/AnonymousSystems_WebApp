import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as CKEDITOR from "src/app/utils/Editors/CustomEditorSuperBuild/ckeditor";
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'anon-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @ViewChild("custom_editor") custom_editor: any;
  @ViewChild("read_only_custom_editor") read_only_custom_editor: any;
  @Input() disable_editing = true;
  @Input() story: any;
  @Input() config: any;
  @Input() ready: any;
  @Output() readyChange = new EventEmitter<any>();
  @Output() editorChange = new EventEmitter<ChangeEvent>();
  CustomEditor = CKEDITOR.CustomBalloonEditor;
  ReadOnlyCustomEditor = CKEDITOR.ReadOnlyCustomBalloonEditor;

  constructor() { }

  onReady(ready_event: any) {this.readyChange.emit(ready_event)}
  onChange(change_event: ChangeEvent) { this.editorChange.emit(change_event); }

}
