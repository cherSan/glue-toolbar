import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {NzIconModule} from "ng-zorro-antd/icon";
type Image = { url: string }
type Icon = { icon: string }
type Text = { text: string }
type Avatar = Image | Icon | Text;
@Component({
  selector: 'ui-panel-element',
  standalone: true,
  imports: [CommonModule, NzAvatarModule, NzTypographyModule, NzIconModule],
  templateUrl: './panel-element.component.html',
  styleUrls: ['./panel-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelElementComponent {
  @Input() public title?: string | null;
  @Input() public description?: string | null;
  @Input() public avatar?: Avatar;
  @Input() public active = false;
}
