#version 150 core

out vec4 outColor;
in vec2 _texCoord0;

const float PI = 3.14159265358979;

uniform sampler2D _texture0;
uniform vec3 _eulerAngles;

void main()
{
  vec2 pos = _texCoord0;
  pos.y = 1 - pos.y;

  float pposy = PI * pos.y;
  float p2posx = 2*PI*pos.x;
  float seax = sin(_eulerAngles.x);
  float seay = sin(_eulerAngles.y);
  float seaz = sin(_eulerAngles.z);
  float ceax = cos(_eulerAngles.x);
  float ceay = cos(_eulerAngles.y);
  float ceaz = cos(_eulerAngles.z);
  float spposy = sin(pposy);
  float cpposy = cos(pposy);
  float sp2posx = sin(p2posx);
  float cp2posx = cos(p2posx);
  float ceaxSeay = ceax*seay;
  float cpposySeax = cpposy*seax;
  float sp2posxSpposy = sp2posx*spposy;
  float cp2posxSpposy = cp2posx*spposy;

  vec2 sourcePixel;

  sourcePixel.x = (atan(ceay*ceaz*sp2posxSpposy+cp2posxSpposy*seay-ceay*cpposy*seaz,ceaz*(cpposySeax-ceaxSeay*sp2posxSpposy)+seaz*(seax*sp2posxSpposy+ceaxSeay*cpposy)+ceax*ceay*cp2posxSpposy)+PI)/(2*PI);
  sourcePixel.y = -(2*asin(((ceax*seaz+ceaz*seax*seay)*sp2posx-ceay*cp2posx*seax)*spposy-cpposySeax*seay*seaz+ceax*ceaz*cpposy)-PI)/(2*PI);

  outColor = texture(_texture0, sourcePixel);
}
