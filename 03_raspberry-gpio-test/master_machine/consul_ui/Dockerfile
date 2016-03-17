FROM gliderlabs/consul:0.6

ADD https://releases.hashicorp.com/consul/0.6.3/consul_0.6.3_web_ui.zip .
RUN mkdir /ui
RUN unzip consul_0.6.3_web_ui.zip -d /ui
RUN rm consul_0.6.3_web_ui.zip

