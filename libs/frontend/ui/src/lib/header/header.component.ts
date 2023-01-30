import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzTypographyModule} from "ng-zorro-antd/typography";
import {RouterLink} from "@angular/router";

type Image = { url?: string | null }
type Icon = { icon?: string | null }
type Text = { text?: string | null }
type Avatar = Image | Icon | Text;
@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [
    NgIf,
    NzIconModule,
    NzAvatarModule,
    NzTypographyModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() public title?: string | null;
  @Input() public description?: string | null;
  @Input() public back?: any[] = undefined;
  @Input() public avatar?: Avatar;
  public hover = false;
}
